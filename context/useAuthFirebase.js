import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { auth } from "firebase/app";
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
  const [loading, setLoading] = useState(false);

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
    console.log("EJecutando use effect", user);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      try {
        if (user) {
          setUser(user);
          setLoading(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        console.log("ERROR ESPERADO", error);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signin,
    signup,
    signout,
    singinGoogle,
  };
}
