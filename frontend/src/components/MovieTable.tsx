import * as React from 'react';
import { Movie } from '../store/types';

interface TableProps {
  movies: Movie[]
}

function MovieTable({ movies }: TableProps) {
  return (
    <table className="movie-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Year</th>
          <th>Genres</th>
          <th>Age limit</th>
          <th>Rating</th>
          <th>Actors</th>
          <th>director</th>
          <th>Synopsis</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.name}</td>
            <td>{movie.year}</td>
            <td>{movie.genres.map((genre) => genre.title).join(', ')}</td>
            <td>{movie.ageLimit}</td>
            <td>{movie.rating}</td>
            <td>
              {movie.actors.map((actor, i, actors) => (
                <div key={actor.id}>
                  {actor.firstName}
                  {' '}
                  {actor.lastName}
                  {i + 1 < actors.length ? ', ' : ''}
                </div>
              ))}
            </td>
            <td>
              {movie.director?.firstName || ''}
              {' '}
              {movie.director?.lastName || ''}
            </td>
            <td>
              {movie.synopsis}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MovieTable;
