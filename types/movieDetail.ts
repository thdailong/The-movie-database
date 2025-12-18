import { IMovie } from "./movie";

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

// Legacy interface for backward compatibility
export interface ICredit {
  id: number;
  name: string;
  job?: string; // For crew (Director, Writer)
  character?: string; // For cast
  profile_path?: string | null;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: ICredits;
}

export const movieToIMovie = (movieDetail: IMovieDetail): IMovie => {
  return {
    adult: movieDetail.adult,
    backdrop_path: movieDetail.backdrop_path,
    genre_ids: movieDetail.genres.map(g => g.id),
    id: movieDetail.id,
    original_language: movieDetail.original_language,
    original_title: movieDetail.original_title,
    overview: movieDetail.overview,
    popularity: movieDetail.popularity,
    poster_path: movieDetail.poster_path,
    release_date: movieDetail.release_date,
    title: movieDetail.title,
    video: movieDetail.video,
    vote_average: movieDetail.vote_average,
    vote_count: movieDetail.vote_count,
  };
};