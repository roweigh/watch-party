import data from '../data.json';
import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc ,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../main';

export async function get (col) {
  const response = await getDocs(query(
    collection(db, col),
    orderBy('rating', 'desc'),
    limit(10),
  ));

  const result = [];
  response.forEach(doc => {
    result.push(doc.data());
  });
  return result;
}

export async function add (col, payload) {
  await addDoc(collection(db, col), payload);
}

export async function update (col, id, payload) {
  await updateDoc(doc(db, col, id), payload);
}

export async function bulkImport () {
  const movieData = [...data].map(movie => {
    return {
      movieId: movie.url.match('\/title\/(.*)\/')[1],
      name: `${movie.name}`,
      description: movie.description,
      rating: movie.aggregateRating.ratingValue.toFixed(1),
      year: movie.datePublished.split('-')[0],
      duration: movie.duration.replace('PT', ''),
      interested: [],
      notInterested: [],
      seen: [],
    };
  });

  const promises = [];
  movieData.forEach(movie => {
    promises.push(addDoc(collection(db, 'movies'), movie));
  });

  await Promise.all(promises);
}