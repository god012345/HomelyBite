// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACmTqBGtsNoBGu3YtUHZy60i-7soA8mmk",
  authDomain: "homelybite-638e4.firebaseapp.com",
  projectId: "homelybite-638e4",
  storageBucket: "homelybite-638e4.firebasestorage.app",
  messagingSenderId: "495272189992",
  appId: "1:495272189992:web:f0fd836b1201e6bfdc151d",
  measurementId: "G-R1ME03QEV7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use persistent auth for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };