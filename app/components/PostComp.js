import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import colors from "../configs/colors";

export default function PostComp({ toyInfo }) {
  return (
    <TouchableOpacity style={styles.postContainer}>
      <Image source={{ uri: toyInfo.toyImage }} style={styles.toyImage} />
      <View style={styles.toyDetail}>
        <Text
          style={{
            fontSize: 25,
            marginBottom: 5,
          }}
        >
          {toyInfo.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "blue",
            marginBottom: 5,
          }}
        >
          {toyInfo.type}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: "gray",
            marginBottom: 5,
            width: "100%",
            textAlign: "justify"
          }}
        >
          {toyInfo.description && toyInfo.description.length >= 340
            ? toyInfo.description.slice(0, 340) + "..."
            : toyInfo.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.soft,
    width: "100%",
    minHeight: 200,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    marginBottom: 15,
    padding: 5,
  },

  toyImage: {
    height: "100%",
    width: "40%",
    borderRadius: 10,
  },
  toyDetail: {
    backgroundColor: colors.soft,
    height: "100%",
    width: "56%",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
});
