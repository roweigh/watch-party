import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../main';

export async function get (col) {
  var test = await getDocs(collection(db, col));
  test.forEach((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  });
}

export async function add (col, payload) {
  await  addDoc(collection(db, col), payload);
}

export async function update (col, id, payload) {
  await  updateDoc(doc(db, col, id), payload);
}