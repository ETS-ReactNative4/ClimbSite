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
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function BottomTab() {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.bottomtab}>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <Feather name="home" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            width: 40,
            textAlign: "center",
            color: "white",
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <Ionicons name="md-location-outline" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            width: 40,
            textAlign: "center",
            color: "white",
          }}
        >
          Explore
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <MaterialCommunityIcons name="crown-outline" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            width: 50,
            textAlign: "center",
            color: "white",
          }}
        >
          Rankings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <Feather name="users" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            width: 70,
            textAlign: "center",
            color: "white",
          }}
        >
          Community
        </Text>
      </TouchableOpacity>
    </View>
  );
}
