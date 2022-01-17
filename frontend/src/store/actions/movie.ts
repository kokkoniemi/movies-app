import { ActionTypes } from './action-types';

import {
  ListMoviesRequest,
  ListMoviesSuccess,
  ListMoviesFailure,
  ListMoviesSuccessPayload,
  FailurePayload,
  CreateMovieRequest,
  Movie,
  CreateMovieSuccess,
  CreateMovieFailure,
  ListMoviesRequestPayload,
} from '../types';

export const listMoviesRequest = (payload:
ListMoviesRequestPayload = { page: 1 }): ListMoviesRequest => ({
  type: ActionTypes.LIST_MOVIES_REQUEST,
  payload,
});

export const listMoviesSuccess = (payload: ListMoviesSuccessPayload): ListMoviesSuccess => ({
  type: ActionTypes.LIST_MOVIES_SUCCESS,
  payload,
});

export const listMoviesFailure = (payload: FailurePayload): ListMoviesFailure => ({
  type: ActionTypes.LIST_MOVIES_FAILURE,
  payload,
});

export const createMovieRequest = (): CreateMovieRequest => ({
  type: ActionTypes.CREATE_MOVIE_REQUEST,
});

export const createMovieSuccess = (payload: Movie): CreateMovieSuccess => ({
  type: ActionTypes.CREATE_MOVIE_SUCCESS,
  payload,
});

export const createMovieFailure = (payload: FailurePayload): CreateMovieFailure => ({
  type: ActionTypes.CREATE_MOVIE_FAILURE,
  payload,
});
