/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBEeM7J-Guyqo-5275vWbnjXQqiK0OEn0w',
  authDomain: 'producthunt-87194.firebaseapp.com',
  projectId: 'producthunt-87194',
  storageBucket: 'producthunt-87194.appspot.com',
  messagingSenderId: '275756959190',
  appId: '1:275756959190:web:6202df5daff6e960c85077',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
