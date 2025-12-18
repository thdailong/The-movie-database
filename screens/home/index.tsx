import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '@/navigation/types';
import Container from '@/components/layout/Container';
import { colors } from '@/theme';
import Category, { CategoryType } from '@/screens/home/Category';
import SortBy, { SortByType } from '@/screens/home/SortBy';
import Search from '@/screens/home/Search';
import Button from '@/components/Button';
import MovieCard from '@/components/MovieCard';
import { useMovies } from '@/hooks';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [category, setCategory] = useState<CategoryType>('now_playing');
  const [sortBy, setSortBy] = useState<SortByType | null>(null);
  const [searchText, setSearchText] = useState('');

  // Track initial values to detect changes
  const initialCategory = useRef<CategoryType>('now_playing');
  const initialSortBy = useRef<SortByType | null>(null);
  const initialSearchText = useRef<string>('');

  const hasFiltersChanged = () => {
    return (
      category !== initialCategory.current ||
      sortBy !== initialSortBy.current ||
      searchText !== initialSearchText.current
    );
  };

  const handleSearch = () => {
    // Apply search/filter logic here
    // Update initial values to current values after search
    initialCategory.current = category;
    initialSortBy.current = sortBy;
    initialSearchText.current = searchText;
    fetchMovies(1);
  };

  const {movies, fetchMovies, isLoading, isLoadingMore, loadMore} = useMovies({
    category: category,
  })

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const RenderFooter = () => {
    if (isLoading || isLoadingMore) {
      return (
        <>
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
        </>
      )
    }
    if (movies.length === 0) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.noMoviesText}>No movies found</Text>
        </View>
      )
    }
    return null;
  }

  return (
    <Container>
      <View style={styles.moviesContainer}>
        <FlatList
          style={styles.flatList}
          ListHeaderComponent={
            <View>
              <Category
                selectedCategory={category}
                onCategoryChange={setCategory}
              />
              <SortBy selectedSort={sortBy} onSortChange={setSortBy} />
              <Search value={searchText} onChangeText={setSearchText} />
              <Button
                title="Search"
                onPress={handleSearch}
                disabled={!hasFiltersChanged()}
                style={styles.searchButton}
              />
            </View>
          }
          data={movies}
          ListFooterComponent={<RenderFooter />}
          renderItem={({ item }) => <MovieCard item={item} />}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
 
  flatList: {
  },
  searchButton: {
    marginBottom: 16,
  },
  moviesContainer: {
    marginTop: 8,
    marginHorizontal: 29,
  },
  movieItem: {
    marginBottom: 12,
  },
  movieContent: {
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: colors.gray.dark,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 22,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  releaseDate: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: colors.black,
    marginTop: 17,
  },
  footerContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noMoviesText: {
    fontSize: 16,
    color: colors.gray.dark,
  },
});

export default HomeScreen;
