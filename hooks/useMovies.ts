import {useState, useCallback} from 'react';
import {
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  FetchMoviesParams,
} from '@/api';
import {IMovie} from '@/types/movie';
import {IMoviesResponse} from '@/types/api';

export type MovieCategory = 'upcoming' | 'now_playing' | 'popular';

interface UseMoviesOptions extends FetchMoviesParams {
  category: MovieCategory;
  enabled?: boolean;
}

interface UseMoviesReturn {
  movies: IMovie[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchMovies: (page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  totalPages: number;
  currentPage: number;
  isLoadingMore: boolean;
}

export const useMovies = (options: UseMoviesOptions): UseMoviesReturn => {
  const {category, page: initialPage = 1, language = 'en-US', enabled = true} = options;

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMoviesInternal = useCallback(
    async (page: number, append: boolean = false) => {
      if (!enabled) return;

      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        let response: IMoviesResponse;

        switch (category) {
          case 'upcoming':
            response = await fetchUpcomingMovies({page, language});
            break;
          case 'now_playing':
            response = await fetchNowPlayingMovies({page, language});
            break;
          case 'popular':
            response = await fetchPopularMovies({page, language});
            break;
          default:
            throw new Error(`Unknown category: ${category}`);
        }

        if (append) {
          setMovies(prev => [...prev, ...response.results]);
        } else {
          setMovies(response.results);
        }
        setTotalPages(response.total_pages);
        setCurrentPage(page);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch movies');
        setError(error);
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [category, language, enabled],
  );

  // Exposed fetchMovies function for initial fetch
  const fetchMovies = useCallback(
    async (page: number = initialPage) => {
      await fetchMoviesInternal(page, false);
    },
    [fetchMoviesInternal, initialPage],
  );

  const loadMore = useCallback(async () => {
    if (isLoadingMore || currentPage >= totalPages) {
      return;
    }
    await fetchMoviesInternal(currentPage + 1, true);
  }, [currentPage, totalPages, isLoadingMore, fetchMoviesInternal]);

  const refresh = useCallback(async () => {
    setCurrentPage(1);
    await fetchMoviesInternal(1, false);
  }, [fetchMoviesInternal]);

  const hasMore = currentPage < totalPages;

  return {
    movies,
    isLoading,
    error,
    hasMore,
    fetchMovies,
    loadMore,
    refresh,
    totalPages,
    currentPage,
    isLoadingMore,
  };
};

