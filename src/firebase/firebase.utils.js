import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const createUserProfileDocument = async (userAuth, aditionalData) => {
  if (!userAuth) return; // ako je null tj ako nije logovan
  const userRef = firestore.doc(`users/${userAuth.uid}`); // cuva putanju
  const snapShot = await userRef.get(); // provjerava da li postoji u bazi

  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    try {
      await userRef.set({
        // upisuje u bazu na osnovu url
        displayName,
        email,
        ...aditionalData
      });
    } catch (error) {
      alert("error creating user " + error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google signin

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
