import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BrowsePost from "./BrowsePost";
import FullPost from "./FullPost";

const StackPost = createNativeStackNavigator();

const PostStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackPost.Navigator
        initialRouteName="Browse Post"
        screenOptions={{ headerShown: true }}
      >
        <StackPost.Screen name="Browse Post" component={BrowsePost} />
        <StackPost.Screen name="Post Details" component={FullPost} />
      </StackPost.Navigator>
    </NavigationContainer>
  );
};

export default PostStack;