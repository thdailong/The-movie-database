import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import Container from '@/components/layout/Container';
import { colors } from '@/theme';
import { movieToIMovie } from '@/types/movieDetail';
import { useMovieDetail } from '@/hooks';
import UserScore from '@/screens/detail/UserScore';
import CastCarousel from '@/components/CastCarousel';
import RecommendedMovies from '@/screens/detail/RecommendedMovies';
import BottomNavBar from '@/components/layout/BottomNavBar';
import ChevronLeft from '@/assets/icon/chevron-left.svg';
import WatchlistIcon from '@/assets/icon/watch-list.svg';
import { storage } from '@/utils/storage';
import MovieDetailSkeleton from '@/components/MovieDetailSkeleton';
import Skeleton from '@/components/Skeleton';

type MovieDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieDetail'
>;

interface Props {
  navigation: MovieDetailScreenNavigationProp;
  route: {
    params: {
      movieId: string;
    };
  };
}

// Helper functions
const getPosterUrl = (posterPath: string): string => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const getYear = (dateString: string): string => {
  return new Date(dateString).getFullYear().toString();
};

const MovieDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Fetch movie detail, credits, and recommended movies
  const { movie, credits, recommended, isLoading, error } = useMovieDetail({
    movieId,
    includeCredits: true,
    includeRecommended: true,
  });

  const cast = credits?.cast || [];
  const crew = credits?.crew || [];

  const directors = crew.filter(c => c.job === 'Director');
  const writers = crew.filter(c => c.job === 'Writer');

  // Get unique crew members with their roles
  const getCrewRoles = (personId: number): string[] => {
    return crew
      .filter(c => c.id === personId)
      .map(c => c.job)
      .filter((job, index, self) => self.indexOf(job) === index);
  };

  // Check if movie is in watchlist on mount
  useEffect(() => {
    if (movie) {
      const checkWatchlist = async () => {
        const inWatchlist = await storage.isInWatchlist(movie.id);
        setIsInWatchlist(inWatchlist);
      };
      checkWatchlist();
    }
  }, [movie]);

  const handleAddToWatchlist = async () => {
    if (!movie) return;

    if (isInWatchlist) {
      await storage.removeFromWatchlist(movie.id);
      setIsInWatchlist(false);
    } else {
      const movieData = movieToIMovie(movie);
      await storage.addToWatchlist(movieData);
      setIsInWatchlist(true);
    }
  };

  const handleRecommendedPress = (id: number) => {
    navigation.push('MovieDetail', { movieId: String(id) });
  };

  // Show skeleton loading while fetching data
  if (isLoading || !movie) {
    return (
      <Container>
        <MovieDetailSkeleton />
        <BottomNavBar />
      </Container>
    );
  }

  // Show error state if needed
  if (error) {
    return (
      <Container>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load movie details</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
        <BottomNavBar />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button and title */}
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <ChevronLeft width={14} height={10} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {movie.title}{' '}
                <Text style={styles.headerYear}>
                  ({getYear(movie.release_date)})
                </Text>
              </Text>
              <View
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            </View>
            <View style={styles.posterRow}>
              <Image
                source={{ uri: getPosterUrl(movie.poster_path) }}
                style={styles.poster}
                resizeMode="cover"
              />
              <View style={styles.detailsColumn}>
                {/* Rating badge */}
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>PG13</Text>
                </View>

                {/* Release date and runtime */}
                <Text style={styles.detailText}>
                  {formatDate(movie.release_date)} (US) •{' '}
                  {formatRuntime(movie.runtime)}
                </Text>

                {/* Genres */}
                <Text style={styles.detailText}>
                  {movie.genres.map(g => g.name).join(', ')}
                </Text>

                {/* Status */}
                <Text style={styles.detailText}>Status: {movie.status}</Text>

                {/* Original Language */}
                <Text style={styles.detailText}>
                  Original Language:{' '}
                  {movie.spoken_languages[0]?.english_name ||
                    movie.original_language}
                </Text>
              </View>
            </View>
          </View>

          {/* Main content area with teal background */}
          <View style={styles.mainContent}>
            <View style={styles.scoreCrewRow}>
              <UserScore score={movie.vote_average} />
              <View style={styles.crewColumn}>
                {directors.map((director, index) => {
                  const roles = getCrewRoles(director.id);
                  return (
                    <View
                      key={`director-${director.id}-${index}`}
                      style={styles.crewItem}
                    >
                      <Text style={styles.crewName}>{director.name}</Text>
                      <Text style={styles.crewRole}>{roles.join(', ')}</Text>
                    </View>
                  );
                })}
                {writers
                  .filter(w => !directors.some(d => d.id === w.id))
                  .map((writer, index) => (
                    <View
                      key={`writer-${writer.id}-${index}`}
                      style={styles.crewItem}
                    >
                      <Text style={styles.crewName}>{writer.name}</Text>
                      <Text style={styles.crewRole}>Writer</Text>
                    </View>
                  ))}
              </View>
            </View>

            {/* Tagline */}
            {movie.tagline && (
              <Text style={styles.tagline}>{movie.tagline}</Text>
            )}

            {/* Overview */}
            <View style={styles.overviewSection}>
              <Text style={styles.overviewTitle}>Overview</Text>
              <Text style={styles.overviewText}>{movie.overview}</Text>
            </View>

            {/* Add to Watchlist button */}
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={styles.watchlistButton}
                onPress={handleAddToWatchlist}
              >
                <WatchlistIcon width={16} height={16} color={colors.white} />
                <Text style={styles.watchlistButtonText}>
                  {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          {/* Cast Carousel - Always show, even if loading */}
          {cast.length > 0 && <CastCarousel cast={cast} />}

          {/* Recommended Movies - Always show, even if loading */}
          {recommended.length > 0 && (
            <RecommendedMovies
              movies={recommended}
              onMoviePress={handleRecommendedPress}
            />
          )}
      </ScrollView>
      <BottomNavBar />
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 19,
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 24,
    color: colors.black,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  headerYear: {
    fontWeight: '400',
  },
  headerContainer: {
    backgroundColor: '#00000026',
  },
  container: {
    backgroundColor: colors.primary,
  },
  mainContent: {
    paddingHorizontal: 28,
    paddingVertical: 34,
  },
  posterRow: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 24,
    paddingHorizontal: 28,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: colors.gray.dark,
    marginRight: 16,
  },
  detailsColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white30,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    color: colors.white30,
    fontSize: 12,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
    fontWeight: '600',
  },
  scoreCrewRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  crewColumn: {
    flex: 1,
    marginLeft: 24,
  },
  crewItem: {
    marginBottom: 12,
  },
  crewName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  crewRole: {
    fontSize: 14,
    color: colors.white,
  },
  tagline: {
    fontSize: 20,
    fontStyle: 'italic',
    color: colors.white,
    marginBottom: 15,
  },
  overviewSection: {
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
  },
  watchlistButton: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    gap: 8,
  },
  watchlistButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
