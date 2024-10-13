
import { get, update } from '../utils/api-utils';

export const getMovies = async () => get('movies');
export const addMovie = async (payload) => add('movies', payload);
export const updateMovie = async (id, payload) => update('movies', id, payload);