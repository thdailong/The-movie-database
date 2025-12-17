import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, TabParamList} from '@/navigation/types';
import Container from '@/components/layout/Container';
import {colors} from '@/theme';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Movie {
  id: string;
  title: string;
  year: string;
  rating: string;
  poster: string;
}

// Mock movie data
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    poster: 'https://via.placeholder.com/150/000000/FFFFFF?text=TDK',
  },
  {
    id: '2',
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    poster: 'https://via.placeholder.com/150/000000/FFFFFF?text=INC',
  },
  {
    id: '3',
    title: 'Interstellar',
    year: '2014',
    rating: '8.6',
    poster: 'https://via.placeholder.com/150/000000/FFFFFF?text=INT',
  },
  {
    id: '4',
    title: 'The Matrix',
    year: '1999',
    rating: '8.7',
    poster: 'https://via.placeholder.com/150/000000/FFFFFF?text=MAT',
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    year: '1994',
    rating: '8.9',
    poster: 'https://via.placeholder.com/150/000000/FFFFFF?text=PUL',
  },
];

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const renderMovieItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', {movieId: item.id})}>
      <Image source={{uri: item.poster}} style={styles.poster} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieYear}>{item.year}</Text>
        <Text style={styles.movieRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <FlatList
        data={mockMovies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
    backgroundColor: colors.gray.dark,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;

