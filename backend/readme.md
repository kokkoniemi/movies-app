## Requirements
- Node version >16

## Components
- Express.js as http server
- Typescript
- Winston for logging
- Dotenv for environment variables
- TypeORM as orm framework
- Docker-compose for dev environment
- Strict Eslint rules (airbnb & airbnb-typescript)
- Joi for input validation


## Quick start
- install docker & docker-compose
- copy `.env.example` to `.env`
- copy `ormconfig.example.json` to `ormconfig.json`
- seed the database with initial data. This should be done only once.
  ```shell
  docker-compose run --rm node_app sh -c "npm run seed"
  ```
- run `docker-compose up`