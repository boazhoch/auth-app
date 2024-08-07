// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
