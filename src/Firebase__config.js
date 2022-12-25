// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtjM6gkzd2kDsw6WpebznsF6R57X_PTSo",
  authDomain: "bepnhamemo-5a215.firebaseapp.com",
  databaseURL: "https://bepnhamemo-5a215-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bepnhamemo-5a215",
  storageBucket: "bepnhamemo-5a215.appspot.com",
  messagingSenderId: "668768910306",
  appId: "1:668768910306:web:ba64b9ac5bb23bf2b897bb",
  measurementId: "G-F88TEFKJD0"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app


// hàm bt -> hàm firebase -> data

// bật thằng này lên trc khi test // 
