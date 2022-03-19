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

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "bold" }}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
    </View>
  );
}
