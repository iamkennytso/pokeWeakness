import firebase from 'firebase/app';
import 'firebase/functions';

const config = {
  apiKey: "AIzaSyC560Bw8vm_pFX6CEVqGjC84OGy_Kd0-wM",
  authDomain: "letsgoweaknesses-8c995.firebaseapp.com",
  databaseURL: "https://letsgoweaknesses-8c995.firebaseio.com",
  projectId: "letsgoweaknesses-8c995",
  storageBucket: "letsgoweaknesses-8c995.appspot.com",
  messagingSenderId: "130405411952"
};

const fire = firebase.initializeApp(config);


export default fire;
export const cloudFunctions = fire.functions();