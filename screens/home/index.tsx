import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '@/navigation/types';
import Container from '@/components/layout/Container';
import { colors } from '@/theme';
import { IMovie } from '@/types/movie';
import Card from '@/components/Card';
import Category, { CategoryType } from '@/screens/home/Category';
import SortBy, { SortByType } from '@/screens/home/SortBy';
import Search from '@/screens/home/Search';
import Button from '@/components/Button';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to get poster URL
const getPosterUrl = (posterPath: string): string => {
  return `https://image.tmdb.org/t/p/w200${posterPath}`;
};

// Mock movie data
const mockMovies: IMovie[] = [
  {
    adult: false,
    backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
    genre_ids: [878, 12, 14],
    id: 83533,
    original_language: 'en',
    original_title: 'Avatar: Fire and Ash',
    overview:
      "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    popularity: 140.1139,
    poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
    release_date: '2025-12-17',
    title: 'Avatar: Fire and Ash',
    video: false,
    vote_average: 6.688,
    vote_count: 16,
  },
  {
    adult: false,
    backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
    genre_ids: [878, 12, 14],
    id: 83534,
    original_language: 'en',
    original_title: 'Avatar: Fire and Ash 2',
    overview:
      "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    popularity: 140.1139,
    poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
    release_date: '2025-12-17',
    title: 'Avatar: Fire and Ash 2',
    video: false,
    vote_average: 6.688,
    vote_count: 16,
  },
  {
    adult: false,
    backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
    genre_ids: [878, 12, 14],
    id: 83535,
    original_language: 'en',
    original_title: 'Avatar: Fire and Ash 3',
    overview:
      "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    popularity: 140.1139,
    poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
    release_date: '2025-12-17',
    title: 'Avatar: Fire and Ash 3',
    video: false,
    vote_average: 6.688,
    vote_count: 16,
  },

  {
    adult: false,
    backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
    genre_ids: [878, 12, 14],
    id: 83536,
    original_language: 'en',
    original_title: 'Avatar: Fire and Ash 4',
    overview:
      "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    popularity: 140.1139,
    poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
    release_date: '2025-12-17',
    title: 'Avatar: Fire and Ash 4',
    video: false,
    vote_average: 6.688,
    vote_count: 16,
  },
];

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
  };

  const renderMovieItem = ({ item }: { item: IMovie }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDetail', { movieId: String(item.id) })
      }
    >
      <Card style={styles.movieItem}>
        <View style={styles.movieContent}>
          <Image
            source={{ uri: getPosterUrl(item.poster_path) }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.releaseDate}>
              {formatDate(item.release_date)}
            </Text>
            <Text style={styles.overview} numberOfLines={2}>
              {item.overview}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

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
          data={mockMovies}
          renderItem={renderMovieItem}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
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
});

export default HomeScreen;
