import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

const firebaseConfig = {
	apiKey: "AIzaSyBaUM3TBVZuNqzFpem3LWXszTV5DlBa9PI",
	authDomain: "bioenergy-a73ad.firebaseapp.com",
	projectId: "bioenergy-a73ad",
	storageBucket: "bioenergy-a73ad.appspot.com",
	messagingSenderId: "256624312778",
	appId: "1:256624312778:web:dfa69981321c0c4b2d0f33",
	measurementId: "G-28TJ6GH1J0"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, firestore, storage };
