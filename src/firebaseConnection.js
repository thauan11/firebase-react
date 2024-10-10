import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCMDgoyQ56XXZ6KrrTbAN84Ah9f_10hpaY",
	authDomain: "curso-7c226.firebaseapp.com",
	projectId: "curso-7c226",
	storageBucket: "curso-7c226.appspot.com",
	messagingSenderId: "303874158489",
	appId: "1:303874158489:web:f322d0ccfea6feb193ad08",
	measurementId: "G-D5T1F7MMB5",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
