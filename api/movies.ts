import axiosInstance from './axios';
import {IMovieDetail, ICredits} from '@/types/movieDetail';
import {IMoviesResponse} from '@/types/api';

export interface FetchMoviesParams {
  page?: number;
  language?: string;
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

