import * as React from "react";
import {
  RefreshControl,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { getDatabase, ref, onValue } from "@firebase/database";

import auth,{app as Firebase} from "../configs/firebase";
import SearchBar from "../components/SearchBar";
import PostComp from "../components/PostComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import CircularProgressTracker from "../components/CircularProgressTracker";
import colors from "../configs/colors";

const db = getDatabase(Firebase);
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function History({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [isLoaded, setLoaded] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    var returnArr = [];
    const reference = ref(db, "posts/");
    onValue(reference, async (snapshot) => {
      returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        if (item.userId === auth.currentUser.uid) {
          const breference = ref(getDatabase(), "toys/" + item["toyId"]);
          onValue(breference, async (toysnapshot) => {
            returnArr.push({ ...item, ...toysnapshot.val() });
          });
        }
      });
      setPosts(returnArr);
      setLoaded(true);
    });
  }, [refreshing]);

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <SearchBar />

      <ScrollView
        style={{}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoaded === true ? (
          posts.map((element, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("My Posts", element)}
            >
              <PostComp key={index} toyInfo={element} />
            </TouchableOpacity>
          ))
        ) : (
          <CircularProgressTracker />
        )}
      </ScrollView>
    </View>
  );
}