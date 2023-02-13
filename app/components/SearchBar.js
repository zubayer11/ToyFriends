import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";

const SearchBar = () => {
  const [text, onChangeText] = React.useState(null);
  return (
    <View style={styles.searchBox}>
      <View style={styles.searchPart}>
        <FontAwesome
          name="search"
          size={20}
          color="black"
          style={{
            padding: "4%",
          }}
        />

        <TextInput
          onChangeText={onChangeText}
          placeholder="Search Toys"
          style={{ width: "100%" }}
          value={text}
        />
      </View>

      <TouchableOpacity>
        <Entypo name="bell" size={40} color="black">
          <Text
            style={{
              color: "blue",
              fontSize: 20,
            }}
          >
            1
          </Text>
        </Entypo>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    height: 50,
    width: "100%",

    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  searchPart: {
    backgroundColor: "#a4ebf3",
    width: "70%",
    height: "100%",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchBar;