import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_AUHT_DOMAIN,
	databaseURL: 'https://peppy-tiger-378213-default-rtdb.firebaseio.com',
	projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, storage, database };

/*
Usuario:
admin@lavidacayucan.com
Contraseña:
123456 */
