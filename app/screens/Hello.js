import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

function Hello(props) {
  return (
      <View style={styles.logoContainer}>
        <Text style={styles.tagLine}>Welcome Home</Text>
      </View>
  );
}
const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagLine: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  }
});

export default Hello;
