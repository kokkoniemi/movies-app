import * as React from 'react';
import { useDispatch } from 'react-redux';
import { listMoviesRequest } from '../store/actions/movie';

function SearchBar() {
  const dispatch = useDispatch();

  const handleInput = (e: any) => {
    if (e.target.value.length >= 3 || e.target.value.length === 0) {
      dispatch(listMoviesRequest({ q: e.target.value }));
    }
  };

  return (
    <input onKeyUp={handleInput} className="search-bar" type="text" placeholder="Search... (type at least 3 characters)" />
  );
}

export default SearchBar;
