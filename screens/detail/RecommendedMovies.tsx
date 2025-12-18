import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {IMovie} from '@/types/movie';
import {colors} from '@/theme';

interface RecommendedMoviesProps {
  movies: IMovie[];
  onMoviePress: (movieId: number) => void;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  movies,
  onMoviePress,
}) => {
  const getPosterUrl = (posterPath: string): string => {
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  };

  const renderMovieItem = ({item}: {item: IMovie}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => onMoviePress(item.id)}>
      <Image
        source={{uri: getPosterUrl(item.poster_path)}}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended movies</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => `recommended-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  movieItem: {
    width: 120,
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: colors.gray.dark,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
});

export default RecommendedMovies;

