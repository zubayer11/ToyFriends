import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
  } from "react-native";
  import { FontAwesome } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { MaterialCommunityIcons} from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { ref, getDatabase, onValue, set } from "@firebase/database";
  import React, { useState, useEffect } from "react";
  import colors from "../configs/colors";
  import PostDetailComponent from "../components/PostDetailComponent";
  import CommentComp from "../components/CommentComp";
  import auth,{app as Firebase} from "../configs/firebase";
  
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const FullPost = ({ route, navigation }) => {
    const postInformation = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [newComment, setNewCom] = useState("");
    const [userData, setuserData] = useState(null);
    const [bookmarked, setBookmarked] = useState(null);
    const [postOwner, setPostOwner] = useState(null);
    const [comments, setComments] = useState(null);
    const [closed, setClosed] = useState(null);
  
    async function fetchData() {
      setClosed(postInformation["closed"]);
      const poreference = ref(
        getDatabase(Firebase),
        "users/" + postInformation.userId
      );
      onValue(poreference, async (usnapshot) => {
        var uu = usnapshot.val();
        uu.key = usnapshot.val().key;
        setPostOwner(uu);
      });
      const reference = ref(
        getDatabase(Firebase),
        "users/" + auth.currentUser.uid
      );
      onValue(reference, async (snapshot) => {
        var u = await snapshot.val();
        setuserData(u);
        if (u["bookmarks"] === null || u["bookmarks"] === undefined) {
          setBookmarked(false);
        } else if (u["bookmarks"].find(key => key===postInformation.key)) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      });
  
      const creference = ref(
        getDatabase(Firebase),
        "comments/" + postInformation.key
      );
      onValue(creference, async (snapshot) => {
        var l = snapshot.size;
        var comArr = [];
        snapshot.forEach(function (childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          comArr.push(item);
          l--;
          if (l <= 0) {
            comArr.sort(compare);
            setComments(comArr);
          }
        });
      });
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchData();
      wait(2000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
      fetchData();
      const willFocusSubscription = navigation.addListener("focus", () => {
        fetchData();
      });
  
      return willFocusSubscription;
    }, [newComment, closed, refreshing]);
  
    function compare(a, b) {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    }
  
    function addBookMark() {
      if (userData === null) return;
      if (bookmarked === false) {
        if (
          userData["bookmarks"] === null ||
          userData["bookmarks"] === undefined
        ) {
          userData["bookmarks"] = [postInformation.key];
        } else {
          userData["bookmarks"].push(postInformation.key);
        }
        setBookmarked(true);
      } else if (
        userData["bookmarks"] !== null &&
        userData["bookmarks"] !== undefined
      ) {
        const index = userData["bookmarks"].indexOf(postInformation.key);
        if (index > -1) {
          userData["bookmarks"].splice(index, 1);
        }
        setBookmarked(false);
      }
      const reference = ref(
        getDatabase(Firebase),
        "users/" + auth.currentUser.uid
      );
      set(reference, userData);
    }
  
    function postComment() {
      if (newComment !== "") {
        const comRef = ref(
          getDatabase(Firebase),
          "comments/" +
            postInformation.key +
            "/" +
            auth.currentUser.uid +
            Date.now()
        );
        set(comRef, {
          commentor: userData.name,
          commentorId: auth.currentUser.uid,
          comment: newComment,
          time: Date.now(),
        });
      }
      setNewCom("");
    }
  
    function closePost() {
      postInformation["closed"] = true;
      setClosed(true);
      const clRef = ref(getDatabase(Firebase), "posts/" + postInformation.key);
      set(clRef, {
        userId: postInformation.userId,
        toyId: postInformation.toyId,
        date: postInformation.date,
        closed: true,
      });
      const uref = ref(getDatabase(Firebase), "users/" + auth.currentUser.uid);
      set(uref, {
        email: userData.email,
        name: userData.name,
        bookmarks: userData.bookmarks,
        numPost: userData.numPost,
        numExchange: userData.numExchange ? userData.numExchange + 1 : 1,
      });
    }
  
    const BookMark = () => {
      return (
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            borderRadius: 50,
            borderColor: "black",
            borderWidth: 0.1,
          }}
          onPress={() => addBookMark()}
        >
          <AntDesign name="star" size={30} color="black" />
        </TouchableOpacity>
      );
    };
  
    const UnBookMark = () => {
      return (
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            borderRadius: 50,
            borderColor: "black",
            borderWidth: 0.1,
          }}
          onPress={() => addBookMark()}
        >
          <AntDesign name="staro" size={30} color="black" />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={{}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              backgroundColor: colors.background,
              width: "100%",
              borderRadius: 10,
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                position: "relative",
                top: 20,
              }}
            >
              <FontAwesome name="user-circle-o" size={70} color="black" />
  
              <Text
                style={{
                  fontSize: 20,
                  color: "blue",
                  width: 200,
                  marginLeft: 20,
                }}
              >
                {postOwner ? postOwner.name : postInformation.userId}
              </Text>
              {bookmarked !== null ? (
                bookmarked ? (
                  <BookMark />
                ) : (
                  <UnBookMark />
                )
              ) : null}
            </View>
            <Text>
              {new Date(postInformation.date).toLocaleString()}
            </Text>
            <PostDetailComponent postInfo={postInformation} />
            {auth.currentUser.uid === postInformation.userId ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  padding: 5,
                  position: "relative",
                  top: 50,
                  borderRadius: 30,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => closePost()}
              >
                <Ionicons name="ios-close-circle" size={20} color="#FFBCBC" />
                <Text style={{ fontSize: 15, color: "#FFBCBC" }}>
                  {closed ? "Closed" : "Close This Post"}
                </Text>
              </TouchableOpacity>
            ) : null}
            {comments ? (
              <View
                style={{
                  height: 60,
                  width: 350,
                  justifyContent: "center",
                  position: "relative",
                  top: 50,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                  }}
                >
                  Comments:
                </Text>
              </View>
            ) : null}
            {comments
              ? comments.map((element, index) => (
                  <CommentComp key={index} comment={element} />
                ))
              : null}
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                height: 80,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                top: 50,
                marginBottom: 50,
              }}
            >
              {closed ? null : (
                <View
                  style={{
                    width: "70%",
                    height: 60,
                    backgroundColor: colors.soft,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    borderWidth: 0.1,
                  }}
                >
                  <TextInput
                    placeholder="add a comment"
                    style={{ fontSize: 15, marginRight: 30 }}
                    value={newComment}
                    onChangeText={(text) => setNewCom(text)}
                  />
                </View>
              )}
              {closed ? null : (
                <TouchableOpacity
                  style={{
                    height: 53,
                    width: 53,
                    borderRadius: 100,
                    borderWidth: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="send-circle"
                    size={50}
                    color="black"
                    onPress={() => postComment()}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    postContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
  });
  
  export default FullPost;