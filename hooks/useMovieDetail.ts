import {useState, useEffect, useCallback} from 'react';
import {fetchMovieDetail, fetchMovieCredits, fetchRecommendedMovies} from '@/api';
import {IMovieDetail, ICredits} from '@/types/movieDetail';
import {IMovie} from '@/types/movie';
import {IMoviesResponse} from '@/types/api';

interface UseMovieDetailOptions {
  movieId: number | string | null;
  enabled?: boolean;
  includeCredits?: boolean;
  includeRecommended?: boolean;
}

interface UseMovieDetailReturn {
  movie: IMovieDetail | null;
  credits: ICredits | null;
  recommended: IMovie[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useMovieDetail = (
  options: UseMovieDetailOptions,
): UseMovieDetailReturn => {
  const {
    movieId,
    enabled = true,
    includeCredits = true,
    includeRecommended = true,
  } = options;

  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [credits, setCredits] = useState<ICredits | null>(null);
  const [recommended, setRecommended] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovieData = useCallback(async () => {
    if (!movieId || !enabled) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const id = typeof movieId === 'string' ? parseInt(movieId, 10) : movieId;

      // Fetch movie detail
      const movieData = await fetchMovieDetail(id);
      setMovie(movieData);

      // Fetch credits if enabled
      if (includeCredits) {
        try {
          const creditsData = await fetchMovieCredits(id);
          // Filter out non-popular crew members (popularity > 0.5)
          const filteredCredits: ICredits = {
            ...creditsData,
            cast: creditsData.cast.filter(castMember => castMember.popularity > 2),
          };
          setCredits(filteredCredits);
        } catch (err) {
          console.warn('Failed to fetch credits:', err);
        }
      }

      // Fetch recommended movies if enabled
      if (includeRecommended) {
        try {
          const recommendedData = await fetchRecommendedMovies(id);
          setRecommended(recommendedData.results);
        } catch (err) {
          console.warn('Failed to fetch recommended movies:', err);
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch movie detail');
      setError(error);
      console.error('Error fetching movie detail:', error);
    } finally {
      setIsLoading(false);
    }
  }, [movieId, enabled, includeCredits, includeRecommended]);

  const refresh = useCallback(async () => {
    await fetchMovieData();
  }, [fetchMovieData]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return {
    movie,
    credits,
    recommended,
    isLoading,
    error,
    refresh,
  };
};

