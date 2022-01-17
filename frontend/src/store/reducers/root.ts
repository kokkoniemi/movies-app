import { combineReducers } from 'redux';
import movieReducer from './movie';

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
