import React from "react";
import { ActivityIndicator } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
const CircularProgressTracker = () => {
  return (
    <ActivityIndicator
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(164,234,235,0.6)",
      }}
      size={100}
      color="black"
    />
  );
};

export default CircularProgressTracker;
