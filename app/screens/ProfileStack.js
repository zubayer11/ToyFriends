import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "./History";
import Profile from "./Profile";
import FullPost from "./FullPost";
const StackPost = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackPost.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: true }}
      >
        <StackPost.Screen name="Profile" component={Profile} />
        <StackPost.Screen name="History" component={History} />
        <StackPost.Screen name="My Posts" component={FullPost} />
      </StackPost.Navigator>
    </NavigationContainer>
  );
};

export default ProfileStack;