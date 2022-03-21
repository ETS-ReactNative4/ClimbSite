import React, { useState } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function CragHeader({ navigation, cragName }) {
  return (
    <View>
      <View style={styles.header}>
        <View style={{ alignSelf: "center", marginLeft: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 22,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
            marginRight: 45,
          }}
        >
          {cragName}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 35,
            padding: 5,
            backgroundColor: "#1B8B6A",
            borderRadius: 20,
            textAlign: "center",
            marginVertical: 10,
            marginHorizontal: 10,
            alignSelf: "center",
            flex: 1,
          }}
          onPress={() => navigation.navigate("Info")}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            width: 100,
            height: 35,
            padding: 5,
            backgroundColor: "#1B8B6A",
            borderRadius: 20,
            textAlign: "center",
            marginVertical: 10,
            alignSelf: "center",
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate("Sectors")}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Sectors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            width: 100,
            height: 35,
            padding: 5,
            backgroundColor: "#1B8B6A",
            borderRadius: 20,
            textAlign: "center",
            marginVertical: 10,
            alignSelf: "center",
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate("CragEvents")}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
