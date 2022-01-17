import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { listMoviesRequest } from './store/actions/movie';
import { RootState } from './store/reducers/root';
import MovieTable from './components/MovieTable';
import MoviePaginator from './components/MoviePaginator';
import SearchBar from './components/SearchBar';

function App() {
  const dispatch = useDispatch();
  const {
    movies, total, error, page,
  } = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(listMoviesRequest());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      </header>
      <section className="content">
        { !movies.length
          ? (<div>Loading...</div>)
          : (
            <div>
              <MovieTable movies={movies} />
              <MoviePaginator total={total} pageLength={5} currentPage={page} />
            </div>
          )}
        { error ? (<div>Error</div>) : ''}
      </section>
    </div>
  );
}

export default App;
