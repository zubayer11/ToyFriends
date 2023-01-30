import React, { useState, createContext } from "react";
import Firebase from "../config/firebase";

export const AuthenticatedUserContext = createContext({});
const auth = Firebase.auth();
export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(
    auth.currentUser && auth.currentUser.emailVerified ? auth.currentUser : null
  );
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
