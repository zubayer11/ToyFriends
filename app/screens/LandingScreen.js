import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "../components";
export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Image
        source={require("../assets/logo_slogan.png")}
        style={styles.logo}
      />

      <View style={{ position: "relative", bottom: "10%" }}>
        <Button
          onPress={() => navigation.navigate("Login")}
          backgroundColor="white"
          title="Log In"
          titleColor="#00D6D8"
          titleSize={16}
          containerStyle={{
            alignSelf: "center",
            width: "90%",
            marginTop: 120,
            borderRadius: 30,
            height: 60,
          }}
        />
        <Button
          onPress={() => navigation.navigate("Signup")}
          backgroundColor="#FFEB00"
          title="Sign Up"
          titleColor="#00D6D8"
          titleSize={16}
          containerStyle={{
            alignSelf: "center",
            width: "90%",
            margin: 30,
            borderRadius: 30,
            height: 60,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00D6D8",
  },
  logo: {
    alignSelf: "center",
    margin: "50%",
  },
});
