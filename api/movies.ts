import axiosInstance from './axios';
import {IMovieDetail, ICredits} from '@/types/movieDetail';
import {IMoviesResponse} from '@/types/api';
import {CategoryType} from '@/screens/home/Category';
import {SortByType} from '@/screens/home/SortBy';

export interface FetchMoviesParams {
  page?: number;
  language?: string;
}

export interface DiscoverMoviesParams extends FetchMoviesParams {
  category?: CategoryType;
  sortBy?: SortByType | null;
  query?: string;
}

/**
 * Fetch upcoming movies
 */
export const fetchUpcomingMovies = async (
  params: FetchMoviesParams = {},
): Promise<IMoviesResponse> => {
  const {page = 1, language = 'en-US'} = params;
  // console.log('axiosInstance', axiosInstance.);
  const response = await axiosInstance.get('/movie/upcoming', {
    params: {
      page,
      language,
    },
  });
  return response.data;
};

/**
 * Fetch now playing movies
 */
export const fetchNowPlayingMovies = async (
  params: FetchMoviesParams = {},
): Promise<IMoviesResponse> => {
  const {page = 1, language = 'en-US'} = params;
  const response = await axiosInstance.get('/movie/now_playing', {
    params: {
      page,
      language,
    },
  });
  return response.data;
};

/**
 * Fetch popular movies
 */
export const fetchPopularMovies = async (
  params: FetchMoviesParams = {},
): Promise<IMoviesResponse> => {
  const {page = 1, language = 'en-US'} = params;
  const response = await axiosInstance.get('/movie/popular', {
    params: {
      page,
      language,
    },
  });
  return response.data;
};

/**
 * Fetch movie detail by ID
 */
export const fetchMovieDetail = async (
  movieId: number,
): Promise<IMovieDetail> => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

/**
 * Fetch movie credits (cast and crew)
 */
export const fetchMovieCredits = async (
  movieId: number,
): Promise<ICredits> => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};

/**
 * Fetch recommended movies for a movie
 */
export const fetchRecommendedMovies = async (
  movieId: number,
  params: FetchMoviesParams = {},
): Promise<IMoviesResponse> => {
  const {page = 1, language = 'en-US'} = params;
  const response = await axiosInstance.get(`/movie/${movieId}/recommendations`, {
    params: {
      page,
      language,
    },
  });
  return response.data;
};

/**
 * Helper function to get date range for now playing movies from API
 */
const getNowPlayingDateRange = async (
  language: string = 'en-US',
): Promise<{gte: string; lte: string} | null> => {
  try {
    const response = await axiosInstance.get('/movie/now_playing', {
      params: {
        page: 1,
        language,
      },
    });
    
    if (response.data.dates) {
      return {
        gte: response.data.dates.minimum,
        lte: response.data.dates.maximum,
      };
    }
  } catch (error) {
    console.error('Error fetching now playing date range:', error);
  }
  return null;
};

/**
 * Helper function to get date range for upcoming movies from API
 */
const getUpcomingDateRange = async (
  language: string = 'en-US',
): Promise<{gte: string} | null> => {
  try {
    const response = await axiosInstance.get('/movie/upcoming', {
      params: {
        page: 1,
        language,
      },
    });
    
    if (response.data.dates) {
      return {
        gte: response.data.dates.minimum,
      };
    }
  } catch (error) {
    console.error('Error fetching upcoming date range:', error);
  }
  return null;
};

/**
 * Map sortBy to TMDB sort_by parameter
 */
const mapSortBy = (sortBy: SortByType | null | undefined): string => {
  if (!sortBy) return 'popularity.desc';
  
  switch (sortBy) {
    case 'alphabetical':
      return 'title.asc';
    case 'rating':
      return 'vote_average.desc';
    case 'release_date':
      return 'release_date.desc';
    default:
      return 'popularity.desc';
  }
};

/**
 * Discover movies with advanced filtering
 * Supports category, sort order, and search
 * 
 * Logic:
 * - If only category exists (no sortBy or query), use regular endpoints
 * - If category + sortBy or query exists, use discover/search API
 */
export const discoverMovies = async (
  params: DiscoverMoviesParams = {},
): Promise<IMoviesResponse> => {
  const {
    page = 1,
    language = 'en-US',
    category = 'popular',
    sortBy = null,
    query,
  } = params;

  const hasSortOrSearch = sortBy !== null || (query && query.trim());

  // If only category exists (no sortBy or search), use regular endpoints
  if (!hasSortOrSearch) {
    switch (category) {
      case 'upcoming':
        return await fetchUpcomingMovies({page, language});
      case 'now_playing':
        return await fetchNowPlayingMovies({page, language});
      case 'popular':
      default:
        return await fetchPopularMovies({page, language});
    }
  }

  // If there's a search query, use the search endpoint
  if (query && query.trim()) {
    const searchParams: Record<string, any> = {
      page,
      language,
      query: query.trim(),
    };
    
    const response = await axiosInstance.get('/search/movie', {
      params: searchParams,
    });
    
    // If sortBy is specified, sort the results client-side
    let results = response.data.results;
    if (sortBy) {
      results = [...results].sort((a, b) => {
        switch (sortBy) {
          case 'alphabetical':
            return a.title.localeCompare(b.title);
          case 'rating':
            return b.vote_average - a.vote_average;
          case 'release_date':
            return new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime();
          default:
            return 0;
        }
      });
    }
    
    return {
      ...response.data,
      results,
    };
  }

  // Build discover params for category + sortBy (no search)
  const discoverParams: Record<string, any> = {
    include_adult: false,
    include_video: false,
    language,
    page,
    sort_by: mapSortBy(sortBy),
  };

  // Add category-specific filters with date ranges from API
  switch (category) {
    case 'now_playing': {
      const dateRange = await getNowPlayingDateRange(language);
      if (dateRange) {
        discoverParams['release_date.gte'] = dateRange.gte;
        discoverParams['release_date.lte'] = dateRange.lte;
      }
      discoverParams['with_release_type'] = '2|3';
      break;
    }
    case 'upcoming': {
      const dateRange = await getUpcomingDateRange(language);
      if (dateRange) {
        discoverParams['release_date.gte'] = dateRange.gte;
      }
      discoverParams['with_release_type'] = '2|3';
      break;
    }
    case 'popular':
    default:
      // Popular doesn't need additional filters
      break;
  }

  const response = await axiosInstance.get('/discover/movie', {
    params: discoverParams,
  });
  
  return response.data;
};

