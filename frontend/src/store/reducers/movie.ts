import { ActionTypes } from '../actions/action-types';
import { MovieActions, MovieState } from '../types';

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: null,
  page: 1,
  total: 0,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action: MovieActions) => {
  switch (action.type) {
    case ActionTypes.LIST_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        page: action.payload?.page || 1,
      };
    case ActionTypes.LIST_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        movies: action.payload.results,
        total: action.payload.count,
      };
    case ActionTypes.LIST_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        movies: [],
      };
    case ActionTypes.CREATE_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CREATE_MOVIE_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        error: null,
        loading: false,
      };
    case ActionTypes.CREATE_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    case ActionTypes.DELETE_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
