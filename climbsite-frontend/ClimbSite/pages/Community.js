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
} from "react-native";

export default function Community() {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text>Community page</Text>
    </View>
  );
}
