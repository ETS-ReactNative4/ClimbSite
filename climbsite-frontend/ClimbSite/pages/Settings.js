import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import EventContainer from "../components/EventContainer";
import * as SecureStore from "expo-secure-store";

export default function Settings({ navigation }) {
  const { height } = useWindowDimensions();

  // const handleLogout = async () => {
  //   SecureStore.deleteItemAsync("token").then(
  //     console.warn(SecureStore.getItemAsync("token"))
  //   );
  //   const access = await SecureStore.getItemAsync("token");
  //   // .then((token) => {
  //   //   var access = JSON.parse(token);
  //   // });
  //   const token = JSON.parse(access);
  //   if (token === null) {
  //     console.warn(token);
  //   } else {
  //     console.warn(token);
  //   }
  // };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Text>Settings</Text>
      <TouchableOpacity style={styles.loginButton}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 17,
            flex: 1,
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
