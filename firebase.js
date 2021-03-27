import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyCrcRDfDi-Lt64Lz2R3PUfmxIbnGdDsIS4',
    authDomain: 'whatsapp-c3d00.firebaseapp.com',
    projectId: 'whatsapp-c3d00',
    storageBucket: 'whatsapp-c3d00.appspot.com',
    messagingSenderId: '357161398537',
    appId: '1:357161398537:web:4e84758479d153738623d8',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
