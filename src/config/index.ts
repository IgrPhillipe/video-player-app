export const VIDEOS_API_URL = process.env.NEXT_PUBLIC_VIDEOS_API_URL;
export const VIDEOS_API_KEY = process.env.NEXT_PUBLIC_VIDEOS_API_KEY;
export const IS_CLIENT = typeof window !== 'undefined';
export const MONGODB_URI = process.env.MONGODB_URI;
export const USER_COOKIE_NAME = 'user_id';
export const DB_NAME = process.env.NEXT_PUBLIC_DB_NAME;
export const COLLECTION_NAME = 'users';
export const DEFAULT_PER_PAGE = 16;

export const ALLOWED_CATEGORIES = [
  'nature',
  'animals',
  'city',
  'people',
  'food',
  'abstract',
  'universe',
];
export const ALLOWED_CATEGORIES_MAP = {
  nature: 'Natureza',
  animals: 'Animais',
  city: 'Cidade',
  people: 'Pessoas',
  food: 'Comida',
  abstract: 'Abstrato',
  universe: 'Universo',
};
