import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import colors from "../configs/colors";
export default function PostDetailComponent({ postInfo }) {
  return (
    <View style={styles.postContainer}>
      <Image source={{ uri: postInfo.toyImage }} style={styles.toyImage} />
      <View style={styles.toyDetail}>
        <Text
          style={{
            fontSize: 28,
            marginBottom: 5,
          }}
        >
          {postInfo.title}
        </Text>
        <Text>{"Type: "+ postInfo.type}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "black",
              margin: 5,
            }}
          >
            By
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "blue",
              margin: 5,
            }}
          >
            {postInfo.author}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                marginRight: 5,
                color: "#006644",
                fontSize: 14,
              }}
            >
              Location:
            </Text>
            <Text
              style={{
                color: "#006644",
                fontSize: 13,
              }}
            >
              {postInfo.location}
            </Text>
          </View>
        </View>

        <ScrollView>
          <Text
            style={{
              fontSize: 10,
              color: "gray",
              marginBottom: 5,
              width: 200,
              textAlign: "justify",
            }}
          >
            {postInfo.description}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.soft,
    width: "95%",
    minHeight: 250,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    marginBottom: 15,
    padding: 5,
    top: 50,
    position: "relative",
  },

  toyImage: {
    height: 240,
    width: "40%",
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  toyDetail: {
    backgroundColor: colors.soft,
    minHeight: 230,
    width: "55%",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
});
