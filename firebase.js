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
  apiKey: "AdfddfsdddddvcxxxxxxA8mmk",
  authDomain: "hocvcvxcccccc4.firebaseapp.com",
  projectId: "homelvxcvdf gggjvhhv8e4",
  storageBucket: "homelybffcnfeaflfndkfvkjfsapp",
  messagingSenderId: "495261465146592",
  appId: "1:49527215416512:web:f0fd836adc135d5da5x3s2dc151d",
  measurementId: "G-R1MEKD54ADSCF1S65DFV7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use persistent auth for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };