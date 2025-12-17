import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/types';
import Container from '@/components/layout/Container';
import {colors} from '@/theme';

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

const MovieDetailScreen: React.FC<Props> = ({route}) => {
  const {movieId} = route.params;

  return (
    <Container>
      <View style={styles.content}>
        <Text style={styles.title}>Movie Detail</Text>
        <Text style={styles.movieId}>Movie ID: {movieId}</Text>
        <Text style={styles.placeholder}>
          Movie details will be displayed here
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  movieId: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;

