import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from './Card';
import { useNavigation } from '@react-navigation/native';
import { IMovie } from '@/types/movie';
import { formatDate, getPosterUrl } from '@/utils/date';
import { colors } from '@/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import CloseIcon from '@/assets/icon/close.svg';

interface Props {
  onDelete?: () => void;
  item: IMovie;
}
const MovieCard: React.FC<Props> = ({ item, onDelete }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDetail', { movieId: String(item.id) })
      }
    >
      <Card style={styles.movieItem}>
        {onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <CloseIcon width={10} height={10} color={colors.black} />
          </TouchableOpacity>
        )}
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
};

const styles = StyleSheet.create({
  movieItem: {
    marginBottom: 12,
    position: 'relative',
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
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 1,
  },
});

export default MovieCard;
