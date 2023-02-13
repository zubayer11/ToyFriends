import {
    Text,
    View
  } from "react-native";
  import { FontAwesome5 } from "@expo/vector-icons";
  
  import React from "react";
  import colors from "../configs/colors";
  
  const CommentComp = ({comment}) => {
    var date = new Date(comment.time);
    return (
      <View
        style={{
          width: "85%",
          flexDirection: "row",
          position: "relative",
          left: 20,
          top: 40,
          marginBottom: 10,
  
          borderRadius: 25,
        }}
      >
        <FontAwesome5 name="user-circle" size={50} color="black" />
        <View
          style={{
            width: "70%",
            backgroundColor: colors.input,
            marginLeft: 10,
            borderRadius: 10,
            borderWidth: 0.3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "blue",
              position: "relative",
              top: 5,
              left: 5,
            }}
          >
            {comment ? comment.commentor : null}
          </Text>
          <Text
            style={{
              position: "relative",
              top: 5,
              left: 5,
              width: "90%",
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            {date.toLocaleString()}
          </Text>
          <Text
            style={{
              position: "relative",
              top: 5,
              left: 20,
              width: "90%",
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            {comment ? comment.comment : null}
          </Text>
        </View>
      </View>
    );
  };
  
  export default CommentComp;
  