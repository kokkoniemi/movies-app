/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import '../utils/env';
import { createConnection } from 'typeorm';
import { logger } from '../utils/logs';
import moviesData from './movies.json';
import { Person } from '../models/person';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

interface SeedPerson {
  firstName: string;
  lastName: string;
}

interface SeedMovie {
  name: string;
  year: number;
  genres: string[];
  ageLimit: number;
  rating: number;
  actors: SeedPerson[];
  director: SeedPerson;
  synopsis: string;
}

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: ['dist/models/*.js'],
  logging: true,
})
  .then((connection) => {
    const movieRepository = connection.getRepository(Movie);
    const genreRepository = connection.getRepository(Genre);
    const personRepository = connection.getRepository(Person);

    moviesData.forEach(async (seedMovie: SeedMovie) => {
      const movie = new Movie();
      movie.name = seedMovie.name;
      movie.year = seedMovie.year;
      movie.ageLimit = seedMovie.ageLimit;
      movie.rating = seedMovie.rating;
      movie.synopsis = seedMovie.synopsis;
      movie.genres = [];
      movie.actors = [];

      for (const seedGenre of seedMovie.genres) {
        let genre = await genreRepository.findOne({ title: seedGenre });
        if (!genre) {
          genre = new Genre();
          genre.title = seedGenre;
          await genreRepository.save(genre);
        }
        movie.genres.push(genre);
      }

      for (const seedActor of seedMovie.actors) {
        let actor = await personRepository.findOne({
          firstName: seedActor.firstName,
          lastName: seedActor.lastName,
        });
        if (!actor) {
          actor = new Person();
          actor.firstName = seedActor.firstName;
          actor.lastName = seedActor.lastName;
          await personRepository.save(actor);
        }
        movie.actors.push(actor);
      }

      let director = await personRepository.findOne({
        firstName: seedMovie.director.firstName,
        lastName: seedMovie.director.lastName,
      });
      if (!director) {
        director = new Person();
        director.firstName = seedMovie.director.firstName;
        director.lastName = seedMovie.director.lastName;
        await personRepository.save(director);
      }
      movie.director = director;
      movieRepository.save(movie);
    });
  })
  .catch((e: Error) => {
    logger.error(e);
  });
