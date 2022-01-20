import Joi from 'joi';
import { ParsedQs } from '../types/general';

const {
  object, string, number, array,
} = Joi.types();

/**
 * LIST validator
 */
const listingSchema = object.keys({
  offset: number
    .min(0)
    .max(99999999),
  limit: number
    .min(1)
    .max(50),
  q: string
    .min(3),
});

export async function validateListingRequest(body: ParsedQs): Promise<any> {
  return listingSchema.validateAsync(body, { stripUnknown: true });
}

export const genre = object.keys({
  title: string.required(),
});

export const person = object.keys({
  firstName: string.required(),
  lastName: string.required(),
});

/**
 * CREATE validator
 */
export const createSchema = object.keys({
  name: string.required(),
  year: number.required(),
  ageLimit: number.required(),
  rating: number.required(),
  synopsis: string.required(),
  genres: array.items(genre),
  actors: array.items(person),
  director: person,
});

export async function validateCreateRequest(body: any): Promise<any> {
  return createSchema.validateAsync(body, { stripUnknown: true });
}
