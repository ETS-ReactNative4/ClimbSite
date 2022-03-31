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
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 22,
          fontWeight: "bold",
          flex: 1,
          textAlign: "center",
          marginLeft: 45,
        }}
      >
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={{ alignSelf: "center", marginRight: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
