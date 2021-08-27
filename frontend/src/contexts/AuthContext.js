import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { secondaryAppAuth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    //we are issuing the sign in request with a secondary reference to the DB, tp stop logging out admin once he create a lifeguard account
    return secondaryAppAuth
      .createUserWithEmailAndPassword(email, password)
      .then(function success(userData) {
        var uid = userData.user.uid; // The UID of the recently created lifeguard
        secondaryAppAuth.signOut();
        return uid;
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
