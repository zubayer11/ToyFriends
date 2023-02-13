import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FullPost from "./FullPost";
import Bookmarks from "./Bookmarks";

const StackPost = createNativeStackNavigator();

const BookmarkStack = () => {
  return (
    <NavigationContainer independent={true}>
      <StackPost.Navigator
        initialRouteName="Bookmarks"
        screenOptions={{ headerShown: true }}
      >
        <StackPost.Screen name="Bookmarks" component={Bookmarks} />
        <StackPost.Screen name="Bookmarked Posts" component={FullPost} />
      </StackPost.Navigator>
    </NavigationContainer>
  );
};

export default BookmarkStack;