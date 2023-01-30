import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const auth = Firebase.auth();
export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    var authenticatedUser = auth.currentUser;
    if (authenticatedUser && authenticatedUser.emailVerified) {
      setUser(authenticatedUser);
    }
    auth.onAuthStateChanged(async (authenticatedUser) => {
      if (authenticatedUser && authenticatedUser.emailVerified) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
    });
  });

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
