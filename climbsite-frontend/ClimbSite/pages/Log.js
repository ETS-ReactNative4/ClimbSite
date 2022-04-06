import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Log({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <View
        style={{
          flex: 1,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",

            width: 120,
            margin: 20,
            height: 120,
            borderRadius: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("LogClimb")}
        >
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../assets/climbing.png")}
          ></Image>
          <Text style={{ fontSize: 16 }}>Log Climb</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",

            width: 120,
            margin: 20,
            height: 120,
            borderRadius: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("LogEvent")}
        >
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../assets/calendar.png")}
          ></Image>
          <Text style={{ fontSize: 16 }}>Log Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2F3F4A",

            width: 120,
            margin: 20,
            height: 120,
            borderRadius: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("SearchEvent")}
        >
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../assets/schedule.png")}
          ></Image>
          <Text style={{ fontSize: 16 }}>Explore Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
