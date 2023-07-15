/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: '@YOUR_KEY',
  authDomain: '@YOUR_DOMAIN',
  projectId: '@YOUR_ID',
  storageBucket: 'producthunt-87194.appspot.com',
  messagingSenderId: '275756959190',
  appId: '@YOUR_APPID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
