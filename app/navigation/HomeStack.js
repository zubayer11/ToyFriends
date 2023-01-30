import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Hello from "../screens/Hello";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  Foundation,
  AntDesign,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Hello"
        component={Hello}
        options={{
          title: "Hello",
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome5
              name={focused ? "squarespace" : "squarespace"}
              color={focused ? "#00c9cc" : "black"}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
