import * as React from 'react';
import { useDispatch } from 'react-redux';
import { listMoviesRequest } from '../store/actions/movie';

interface Props {
  total: number;
  pageLength: number;
  currentPage: number;
}

function MoviePaginator({ total, pageLength, currentPage }: Props) {
  const dispatch = useDispatch();

  const pageCount = Math.ceil(total / pageLength);
  const pageLinks = [];
  for (let i = 0; i < pageCount; i += 1) {
    const isActive = currentPage === i + 1;
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    pageLinks.push(
      <li key={i} className={`paginator-link ${isActive ? 'active' : ''}`}>
        <button type="button" onClick={() => dispatch(listMoviesRequest({ page: i + 1 }))}>
          {i + 1}
        </button>
      </li>,
    );
  }

  return (
    <div className="paginator">
      Total:&nbsp;
      {total}
      <ul className="paginator-links">{pageLinks}</ul>
    </div>
  );
}

export default MoviePaginator;
