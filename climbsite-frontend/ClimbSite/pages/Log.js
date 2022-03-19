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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Log({ navigation }) {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header />
      <View
        style={{
          flex: 1,
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: height * 0.35,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",
            flex: 0.3,
            width: 100,
            margin: 10,
            height: 100,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("LogClimb")}
        >
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../assets/climbing.png")}
            ></Image>
            <Text>Log Climb</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",
            flex: 0.3,
            width: 100,
            margin: 10,
            height: 100,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("LogEvent")}
        >
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../assets/calendar.png")}
            ></Image>
            <Text>Log Event</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",
            flex: 0.3,
            width: 100,
            margin: 10,
            height: 100,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("SearchEvent")}
        >
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../assets/schedule.png")}
            ></Image>
            <Text>Log Event</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
