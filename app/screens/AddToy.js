import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  ref as storageRef,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

import colors from "../configs/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDatabase, ref, set, onValue } from "@firebase/database";
import auth, { app as Firebase } from "../configs/firebase";
import CircularProgressTracker from "../components/CircularProgressTracker";

const AddToy = () => {
  const [imageFile, setFile] = React.useState(null);
  const [title, tileChangeText] = React.useState(null);
  const [author, authorChangeText] = React.useState(null);
  const [description, descriptionChangeText] = React.useState(null);
  const [location, locationChangeText] = React.useState(null);

  const [pickValue, setPickValue] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    setImage(null);
    tileChangeText(null);
    authorChangeText(null);
    descriptionChangeText(null);
    setPickValue(null);
    locationChangeText(null);
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    const ur = ref(getDatabase(Firebase), "users/" + auth.currentUser.uid);
    onValue(ur, async (snapshot) => {
      var u = await snapshot.val();
      setuserData(u);
    });
  }, []);

  async function addPostToDB(
    title,
    author,
    description,
    type,
    location,
    image_File
  ) {
    if (
      title === null ||
      author === null ||
      description === null ||
      location === null ||
      image_File === null
    ) {
      Alert.alert("Eror!", "Please Fill All The Fields", [{ text: "OK" }]);
      return;
    }
    setUploading(true);
    var postId = auth.currentUser.uid + Date.now();
    var filepathX = postId + title;
    var uri = image_File;
    var filepath = filepathX;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const fileRef = storageRef(getStorage(Firebase), filepath);
    uploadBytes(fileRef, blob).then(async (snapshot) => {
      getDownloadURL(fileRef).then(async (url) => {
        const db = getDatabase(Firebase);
        const postRef = ref(db, "posts/" + postId);
        set(postRef, {
          userId: auth.currentUser.uid,
          toyId: filepathX,
          date: Date.now(),
        });
        const toyRef = ref(db, "toys/" + filepathX);
        set(toyRef, {
          title: title,
          author: author,
          description: description,
          type: type,
          toyImage: url,
          location: location,
          closed: false,
        });

        const uref = ref(db, "users/" + auth.currentUser.uid);
        set(uref, {
          email: userData.email,
          name: userData.name,
          bookmarks: userData.bookmarks ? userData.bookmarks : [],
          numPost: userData.numPost + 1,
          numExchange: userData.numExchange,
        });
        Alert.alert("Success!", "Post Uploaded", [{ text: "OK" }]);
        setUploading(false);
      });
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 800,
      mediaType: "photo",
      quality: 0,
    });
    setFile(result.file);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <View
          style={{
            backgroundColor: "#00D6D8",
            alignItems: "center",
            justifyContent: "center",
            width: "85%",
            height: 50,
            borderRadius: 0,
          }}
        >
          <Text
            style={{
              alignItems: "center",
              fontSize: 20,
            }}
          >
            Add New Toy
          </Text>
        </View>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            height: 180,
            width: 130,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.input,
            margin: 20,
            borderRadius: 10,
          }}
        >
          {image === null ? (
            <Entypo name="camera" size={24} color="black" />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: 130, height: 180 }}
            />
          )}
        </TouchableOpacity>

        <TextInput
          onChangeText={tileChangeText}
          placeholder="Title"
          style={styles.inputTextDesign}
          value={title}
        />
        <TextInput
          onChangeText={authorChangeText}
          placeholder="Manufacturer Name"
          style={styles.inputTextDesign}
          value={author}
        />
        <TextInput
          onChangeText={descriptionChangeText}
          placeholder="Description About Toy"
          style={styles.inputDescription}
          value={description}
        />

        <TextInput
          onChangeText={setPickValue}
          placeholder="Type"
          style={styles.inputTextDesign}
          value={pickValue}
        />

        <TextInput
          onChangeText={locationChangeText}
          placeholder="Post Location"
          style={styles.inputTextDesign}
          value={location}
        />
        <TouchableOpacity
          onPress={() => {
            if (image === null) {
              Alert.alert("Error!", "Please Upload The Toy Image", [
                { text: "OK" },
              ]);
              return;
            }
            addPostToDB(title, author, description, pickValue, location, image);
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#00D6D8",
              height: 50,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              margin: 15,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              Add Toy
            </Text>
          </Pressable>
        </TouchableOpacity>
      </View>
      {uploading ? <CircularProgressTracker /> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    marginBottom: 100,
  },

  inputTextDesign: {
    width: "85%",
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.input,
    alignItems: "center",
    paddingLeft: 15,
    margin: 10,
  },

  inputDescription: {
    width: "85%",
    height: 120,
    borderRadius: 5,
    backgroundColor: colors.input,
    alignItems: "center",
    paddingLeft: 15,
    margin: 10,
  },
});

export default AddToy;
