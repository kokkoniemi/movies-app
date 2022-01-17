import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class Initial1642341442417 implements MigrationInterface {
  name = 'Initial1642341442417';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "year" integer NOT NULL, "ageLimit" integer NOT NULL, "rating" integer NOT NULL, "synopsis" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "directorId" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "movie_genres_genre" ("movieId" uuid NOT NULL, "genreId" uuid NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))');
    await queryRunner.query('CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") ');
    await queryRunner.query('CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") ');
    await queryRunner.query('CREATE TABLE "movie_actors_person" ("movieId" uuid NOT NULL, "personId" uuid NOT NULL, CONSTRAINT "PK_3eb3c267516a7737fb74c57dddd" PRIMARY KEY ("movieId", "personId"))');
    await queryRunner.query('CREATE INDEX "IDX_77c5cbf4e00abaea5f13b2f49d" ON "movie_actors_person" ("movieId") ');
    await queryRunner.query('CREATE INDEX "IDX_965d386f2282f97ba4cf443266" ON "movie_actors_person" ("personId") ');
    await queryRunner.query('ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE "movie_actors_person" ADD CONSTRAINT "FK_77c5cbf4e00abaea5f13b2f49d6" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE "movie_actors_person" ADD CONSTRAINT "FK_965d386f2282f97ba4cf4432662" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE');
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "movie_actors_person" DROP CONSTRAINT "FK_965d386f2282f97ba4cf4432662"');
    await queryRunner.query('ALTER TABLE "movie_actors_person" DROP CONSTRAINT "FK_77c5cbf4e00abaea5f13b2f49d6"');
    await queryRunner.query('ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"');
    await queryRunner.query('ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"');
    await queryRunner.query('ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"');
    await queryRunner.query('DROP INDEX "public"."IDX_965d386f2282f97ba4cf443266"');
    await queryRunner.query('DROP INDEX "public"."IDX_77c5cbf4e00abaea5f13b2f49d"');
    await queryRunner.query('DROP TABLE "movie_actors_person"');
    await queryRunner.query('DROP INDEX "public"."IDX_1996ce31a9e067304ab168d671"');
    await queryRunner.query('DROP INDEX "public"."IDX_985216b45541c7e0ec644a8dd4"');
    await queryRunner.query('DROP TABLE "movie_genres_genre"');
    await queryRunner.query('DROP TABLE "movie"');
    await queryRunner.query('DROP TABLE "person"');
    await queryRunner.query('DROP TABLE "genre"');
  }
}
