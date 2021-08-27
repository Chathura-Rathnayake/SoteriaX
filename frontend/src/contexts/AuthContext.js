import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { secondaryApp } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    secondaryApp //we are issuing the sign in request with the secondary reference to stop logging out admin once he create a lifeguard account
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (firebaseUser) {
        console.log("User " + firebaseUser.uid + " created successfully!");
        secondaryApp.auth().signOut();
      });
  }

  function login(email, password) {
    console.log("inside login function");
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password)
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    // updateEmail,
    // updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
