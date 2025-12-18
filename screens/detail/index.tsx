import React, { useState } from 'react';
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
import { IMovieDetail, ICast, ICrew } from '@/types/movieDetail';
import { IMovie } from '@/types/movie';
import UserScore from '@/screens/detail/UserScore';
import CastCarousel from '@/components/CastCarousel';
import RecommendedMovies from '@/screens/detail/RecommendedMovies';
import Button from '@/components/Button';
import BottomNavBar from '@/components/layout/BottomNavBar';
import ChevronLeft from '@/assets/icon/chevron-left.svg';
import WatchlistIcon from '@/assets/icon/Watchlist.svg';

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

// Mock data - in real app, this would come from API
const mockMovieDetail: IMovieDetail = {
  adult: false,
  backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
  belongs_to_collection: {
    id: 87096,
    name: 'Avatar Collection',
    poster_path: '/3C5brXxnBxfkeKWwA1Fh4xvy4wr.jpg',
    backdrop_path: '/6qkJLRCZp9Y3ovXti5tSuhH0DpO.jpg',
  },
  budget: 400000000,
  genres: [
    { id: 878, name: 'Science Fiction' },
    { id: 12, name: 'Adventure' },
    { id: 14, name: 'Fantasy' },
  ],
  homepage: 'https://www.avatar.com/movies/avatar-fire-and-ash',
  id: 83533,
  imdb_id: 'tt1757678',
  origin_country: ['US'],
  original_language: 'en',
  original_title: 'Avatar: Fire and Ash',
  overview:
    "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
  popularity: 211.4017,
  poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
  production_companies: [
    {
      id: 127928,
      logo_path: '/h0rjX5vjW5r8yEnUBStFarjcLT4.png',
      name: '20th Century Studios',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2025-12-17',
  revenue: 0,
  runtime: 197,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'The world of Pandora will change forever.',
  title: 'Avatar: Fire and Ash',
  video: false,
  vote_average: 7.11,
  vote_count: 69,
};

// Mock cast data
const mockCast: ICast[] = [
  {
    adult: false,
    gender: 2,
    id: 65731,
    known_for_department: 'Acting',
    name: 'Sam Worthington',
    original_name: 'Sam Worthington',
    popularity: 8.0654,
    profile_path: '/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg',
    cast_id: 1,
    character: 'Jake Sully',
    credit_id: '52fe48a89251416c91094013',
    order: 0,
  },
  {
    adult: false,
    gender: 1,
    id: 8691,
    known_for_department: 'Acting',
    name: 'Zoe Saldaña',
    original_name: 'Zoe Saldaña',
    popularity: 8.343,
    profile_path: '/vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg',
    cast_id: 2,
    character: 'Neytiri',
    credit_id: '52fe48a89251416c91094017',
    order: 1,
  },
  {
    adult: false,
    gender: 1,
    id: 10205,
    known_for_department: 'Acting',
    name: 'Sigourney Weaver',
    original_name: 'Sigourney Weaver',
    popularity: 6.621,
    profile_path: '/wTSnfktNBLd6kwQxgvkqYw6vEon.jpg',
    cast_id: 19,
    character: 'Kiri',
    credit_id: '581fa0dd92514168b30050fb',
    order: 2,
  },
  {
    adult: false,
    gender: 2,
    id: 32747,
    known_for_department: 'Acting',
    name: 'Stephen Lang',
    original_name: 'Stephen Lang',
    popularity: 5.1813,
    profile_path: '/hdRiM73H2mpJws559TWHCAia7qJ.jpg',
    cast_id: 122,
    character: 'Quaritch',
    credit_id: '692c32667898fdbbc1e73f05',
    order: 3,
  },
];

// Mock crew data
const mockCrew: ICrew[] = [
  {
    adult: false,
    gender: 2,
    id: 1532,
    known_for_department: 'Directing',
    name: 'James Cameron',
    original_name: 'James Cameron',
    popularity: 12.345,
    profile_path: '/k3eIoS8wgr5a4vH3FDE91VODIhs.jpg',
    credit_id: '52fe48009251416c7502a7c3',
    department: 'Directing',
    job: 'Director',
  },
  {
    adult: false,
    gender: 2,
    id: 1532,
    known_for_department: 'Writing',
    name: 'James Cameron',
    original_name: 'James Cameron',
    popularity: 12.345,
    profile_path: '/k3eIoS8wgr5a4vH3FDE91VODIhs.jpg',
    credit_id: '52fe48009251416c7502a7c4',
    department: 'Writing',
    job: 'Writer',
  },
  {
    adult: false,
    gender: 2,
    id: 1533,
    known_for_department: 'Writing',
    name: 'Rick Jaffa',
    original_name: 'Rick Jaffa',
    popularity: 3.456,
    profile_path: null,
    credit_id: '52fe48009251416c7502a7c5',
    department: 'Writing',
    job: 'Writer',
  },
];

// Mock recommended movies
const mockRecommended: IMovie[] = [
  {
    adult: false,
    backdrop_path: '/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg',
    genre_ids: [878, 12, 14],
    id: 83534,
    original_language: 'en',
    original_title: 'Avatar: The Way of Water',
    overview: 'Set more than a decade after the events of the first film.',
    popularity: 140.1139,
    poster_path: '/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg',
    release_date: '2022-12-16',
    title: 'Avatar: The Way of Water',
    video: false,
    vote_average: 7.6,
    vote_count: 1000,
  },
];

const MovieDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // In real app, fetch movie detail, cast, and recommended movies based on movieId
  const movie = mockMovieDetail;
  const cast = mockCast;
  const crew = mockCrew;
  const recommended = mockRecommended;

  const directors = crew.filter(c => c.job === 'Director');
  const writers = crew.filter(c => c.job === 'Writer');

  // Get unique crew members with their roles
  const getCrewRoles = (personId: number): string[] => {
    return crew
      .filter(c => c.id === personId)
      .map(c => c.job)
      .filter((job, index, self) => self.indexOf(job) === index);
  };

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    // In real app, add/remove from watchlist
  };

  const handleRecommendedPress = (id: number) => {
    navigation.replace('MovieDetail', { movieId: String(id) });
  };

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
              <TouchableOpacity style={styles.watchlistButton}>
                <WatchlistIcon width={16} height={16} color={colors.white} />
                <Text style={styles.watchlistButtonText}>Add to Watchlist</Text>
              </TouchableOpacity>
            </View>

            {/* Cast Carousel */}
            <CastCarousel cast={cast} />

            {/* Recommended Movies */}
            <RecommendedMovies
              movies={recommended}
              onMoviePress={handleRecommendedPress}
            />
          </View>
        </View>
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
    flex: 1,
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
});

export default MovieDetailScreen;
