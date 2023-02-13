import * as React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

import {app as Firebase} from "../configs/firebase";
import SearchBar from "../components/SearchBar";
import ToyComp from "../components/ToyComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import CircularProgressTracker from "../components/CircularProgressTracker";
import colors from "../configs/colors";


const db = getDatabase(Firebase);

export default function ToysView({ navigation }) {
  const [breload, setbReload] = React.useState(false);
  const [bisLoaded, setbLoaded] = React.useState(false);
  const [toys, setToys] = React.useState([]);
  React.useEffect(() => {
    setbReload(false);
    var returnArr = [];
    const reference = ref(db, "toys/");
    onValue(reference, async (snapshot) => {
      returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
      });
      setToys(returnArr);
      setbLoaded(true);
      setbReload(false);
    });
    if (returnArr.length === 0) {
      setbReload(true);
    }
  }, [breload]);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}
    >
      <SearchBar />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: 10,
        }}
      >
        {bisLoaded === true ? (
          toys.map((element, index) => (
            <TouchableOpacity
              key={index}
            >
              <ToyComp style={{}} key={index} toyInfo={element} />
            </TouchableOpacity>
          ))
        ) : (
          <CircularProgressTracker />
        )}
      </ScrollView>
    </View>
  );
}
