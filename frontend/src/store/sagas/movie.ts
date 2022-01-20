import axios from 'axios';
import {
  call, put, takeLatest, delay,
} from 'redux-saga/effects';
import {
  ListMoviesSuccessPayload, Movie, Data, ListMoviesRequest,
} from '../types';
import { listMoviesSuccess, listMoviesFailure } from '../actions/movie';
import { ActionTypes } from '../actions/action-types';

const baseUrl = 'http://localhost:9000/v1/';
const movieApi = {
  list: (params?: Data): any => axios.get<ListMoviesSuccessPayload>(`${baseUrl}movies/`, { params }),
  create: (data: Data, params?: Data) => axios.post<Movie>(`${baseUrl}movies/`, data, { params }),
};

function* listMoviesSaga(action: ListMoviesRequest): any {
  try {
    yield delay(200);
    const pageLength = 5;
    const offset = ((action.payload?.page || 1) - 1) * pageLength;
    const q = action.payload?.q || null;
    const res = yield call(movieApi.list, q ? { q } : { offset });

    yield put(
      listMoviesSuccess({
        ...res.data,
      }),
    );
  } catch (e: any) {
    yield put(
      listMoviesFailure({
        message: e.message,
      }),
    );
  }
}

function* movieSaga() {
  yield takeLatest(ActionTypes.LIST_MOVIES_REQUEST, listMoviesSaga);
}

export default movieSaga;
