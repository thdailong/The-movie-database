import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, TabParamList} from '@/navigation/types';
import Container from '@/components/layout/Container';
import {colors} from '@/theme';
import {IMovie} from '@/types/movie';
import {storage} from '@/utils/storage';
import {useAccount} from '@/hooks';
import {IAccount} from '@/types/api';
import ChevronLeft from '@/assets/icon/chevron-left.svg';
import ChevronBottom from '@/assets/icon/chevron-bottom.svg';
import MovieCard from '@/components/MovieCard';
import Skeleton from '@/components/Skeleton';

type WishlistScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Wishlist'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: WishlistScreenNavigationProp;
}

export type FilterByType = 'alphabetical' | 'rating' | 'release_date';
type SortOrder = 'asc' | 'desc';

// Helper function to get display name (name or username)
const getDisplayName = (user: IAccount | null): string => {
  if (!user) return 'John Lee';
  return user.name || user.username;
};

// Helper function to get user initial
const getUserInitial = (user: IAccount | null): string => {
  const displayName = getDisplayName(user);
  return displayName.charAt(0).toUpperCase();
};

const WishlistScreen: React.FC<Props> = ({navigation}) => {
  const [watchlist, setWatchlist] = useState<IMovie[]>([]);
  const [filterBy, setFilterBy] = useState<FilterByType>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get account data from API
  const {account: user, isLoading: isLoadingUser} = useAccount();

  // Load watchlist
  const loadWatchlist = useCallback(async () => {
    const movies = await storage.getWatchlist();
    setWatchlist(movies);
  }, []);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  // Refresh watchlist when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWatchlist();
    });
    return unsubscribe;
  }, [navigation, loadWatchlist]);

  // Sort and filter movies
  const sortedMovies = React.useMemo(() => {
    const sorted = [...watchlist];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (filterBy) {
        case 'alphabetical':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'rating':
          comparison = a.vote_average - b.vote_average;
          break;
        case 'release_date':
          comparison = new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [watchlist, filterBy, sortOrder]);

  const handleRemoveFromWatchlist = async (movieId: number) => {
    await storage.removeFromWatchlist(movieId);
    loadWatchlist();
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const getFilterLabel = (): string => {
    switch (filterBy) {
      case 'alphabetical':
        return 'Alphabetical order';
      case 'rating':
        return 'Rating';
      case 'release_date':
        return 'Release date';
      default:
        return 'Rating';
    }
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate loading for about 1000ms
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
    await loadWatchlist();
    setIsRefreshing(false);
  }, [loadWatchlist]);

  return (
    <Container>
      <View style={styles.scrollView}>
        {/* User Profile Banner */}
        <View style={styles.profileBanner}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            >
            <View>
              <ChevronLeft color={colors.white} />
            </View>
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              {isLoadingUser ? (
                <Skeleton width={60} height={60} borderRadius={30} />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getUserInitial(user)}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.userInfo}>
              {isLoadingUser ? (
                <>
                  <Skeleton width={120} height={18} borderRadius={4} style={styles.usernameSkeleton} />
                  <Skeleton width={150} height={14} borderRadius={4} style={styles.memberSinceSkeleton} />
                </>
              ) : (
                <>
                  <Text style={styles.username}>{getDisplayName(user)}</Text>
                  <Text style={styles.memberSince}>
                    Member since August 2023
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>My Watchlist</Text>

          {/* Filter and Order Bar */}
          <View style={styles.filterBar}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Filter by:</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>{getFilterLabel()}</Text>
                <ChevronBottom width={10} height={14} fill={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order:</Text>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={toggleSortOrder}>
                {sortOrder === 'asc' ? (
                  <ChevronBottom width={10} height={14} fill={colors.black} />
                ) : (
                  <View style={styles.chevronUp}>
                    <ChevronBottom
                      width={10}
                      height={14}
                      fill={colors.black}
                      style={{transform: [{rotate: '180deg'}]}}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Movie List */}
          {sortedMovies.length > 0 ? (
            <FlatList
              data={sortedMovies}
              renderItem={({ item }) => <MovieCard item={item} onDelete={() => handleRemoveFromWatchlist(item.id)} />}
              keyExtractor={item => `watchlist-${item.id}`}
              contentContainerStyle={styles.listContent}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              }
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Your watchlist is empty
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Add movies to your watchlist from the detail screen
              </Text>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileBanner: {
    backgroundColor: colors.background,
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 12,
    paddingLeft: 0,
  },
  backIcon: {},
  avatarContainer: {
    marginRight: 26,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9747FF', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  usernameSkeleton: {
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: '#FFFFFFB2',
  },
  memberSinceSkeleton: {
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 16,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    color: colors.black,
    marginRight: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 14,
    color: colors.black,
    marginRight: 8,
  },
  orderButton: {
    padding: 4,
  },
  chevronUp: {
    transform: [{rotate: '180deg'}],
  },
  listContent: {
    paddingBottom: 20,
  },
  movieItem: {
    marginBottom: 12,
    padding: 12,
  },
  movieContent: {
    flexDirection: 'row',
    position: 'relative',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: colors.gray.dark,
    marginRight: 12,
  },
  movieInfo: {
    flex: 1,
    paddingRight: 24,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 24,
    color: colors.black,
    fontWeight: '300',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default WishlistScreen;
