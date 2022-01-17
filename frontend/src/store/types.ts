import { ActionTypes } from './actions/action-types';

export type Data<
    T extends string | number | symbol = string,
    K = string | number | null,
    > = Record<T, K>;

export interface Genre {
  id?: string;
  title: string;
}

export interface Person {
  id?: string;
  firstName: string;
  lastName: string;
}

export interface Movie {
  id?: string;
  name: string;
  year: number;
  ageLimit: number;
  rating: number;
  synopsis: string;
  director: Person;
  actors: Person[];
  genres: Genre[];
}

export interface FailurePayload {
  message: string;
}

/**
 * LIST MOVIES
 */
export interface ListMoviesRequest {
  type: typeof ActionTypes.LIST_MOVIES_REQUEST;
  payload: ListMoviesRequestPayload,
}

export interface ListMoviesSuccess {
  type: typeof ActionTypes.LIST_MOVIES_SUCCESS;
  payload: ListMoviesSuccessPayload;
}

export interface ListMoviesFailure {
  type: typeof ActionTypes.LIST_MOVIES_FAILURE;
  payload: FailurePayload;
}

export interface ListMoviesRequestPayload {
  page?: number;
  q?: string;
}

export interface ListMoviesSuccessPayload {
  count: number;
  results: Movie[];
  next: string;
}

/**
 * CREATE MOVIE
 */
export interface CreateMovieRequest {
  type: typeof ActionTypes.CREATE_MOVIE_REQUEST;
}

export interface CreateMovieSuccess {
  type: typeof ActionTypes.CREATE_MOVIE_SUCCESS;
  payload: Movie;
}

export interface CreateMovieFailure {
  type: typeof ActionTypes.CREATE_MOVIE_FAILURE;
  payload: FailurePayload
}

/**
 * DELETE MOVIE
 */
export interface DeleteMovieRequest {
  type: typeof ActionTypes.DELETE_MOVIE_REQUEST;
}

export interface DeleteMovieSuccess {
  type: typeof ActionTypes.DELETE_MOVIE_SUCCESS;
  payload: null;
}

export interface DeleteMovieFailure {
  type: typeof ActionTypes.DELETE_MOVIE_FAILURE;
  payload: FailurePayload;
}

export type MovieActions =
  | ListMoviesRequest
  | ListMoviesSuccess
  | ListMoviesFailure
  | CreateMovieRequest
  | CreateMovieSuccess
  | CreateMovieFailure
  | DeleteMovieRequest
  | DeleteMovieSuccess
  | DeleteMovieFailure;

export interface MovieState {
  loading: boolean;
  movies: Movie[];
  error: string | null;
  page: number;
  total: number;
}
