import { all, fork } from 'redux-saga/effects';
import movieSaga from './movie';

export function* rootSaga() {
  yield all([fork(movieSaga)]);
}

export default rootSaga;
