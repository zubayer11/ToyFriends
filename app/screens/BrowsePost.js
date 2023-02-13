import * as React from "react";
import {
  RefreshControl,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { getDatabase, ref, onValue } from "@firebase/database";

import {app as Firebase} from "../configs/firebase";
import SearchBar from "../components/SearchBar";
import PostComp from "../components/PostComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import CircularProgressTracker from "../components/CircularProgressTracker";
import colors from "../configs/colors";

const db = getDatabase(Firebase);
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function BrowsePost({ navigation }) {
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
      var l = snapshot.size;
      returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        const breference = ref(db, "toys/" + item["toyId"]);
        onValue(breference, async (toysnapshot) => {
          returnArr.push({ ...item, ...toysnapshot.val() });
          l--;
          if (l <= 0) {
            setPosts(returnArr);
            setLoaded(true);
          }
        });
      });
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
                onPress={() => navigation.navigate("Post Details", element)}
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