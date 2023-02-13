import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import colors from "../configs/colors";

export default function ToyComp({ toyInfo }) {
  return (
    <TouchableOpacity style={styles.postContainer}>
      <Image source={{ uri: toyInfo.toyImage }} style={styles.toyImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.soft,
    width: 160,
    height: 230,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.5,
    margin: "4%",
    padding: 5,
  },

  toyImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
  },
});