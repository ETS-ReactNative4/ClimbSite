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

export default function ProfileHeader({ navigation, title }) {
  return (
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
        {title}
      </Text>
    </View>
  );
}
