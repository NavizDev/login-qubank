import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase/firebaseConfig";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let provider = new firebase.auth.GoogleAuthProvider();
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  function singinGoogle() {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (response) {
        setUser(response.user);
        return response.user;
      });
  }

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  function isLogin() {
    return firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("El usuario logueado es:", user);
        setAuthenticated(true);
        return true;
      } else {
        return false;
      }
    });
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    console.log("EJecutando use effect");

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    singinGoogle,
  };
}
