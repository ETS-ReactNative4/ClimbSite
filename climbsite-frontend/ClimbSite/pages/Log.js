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
import { SafeAreaView } from "react-native-safe-area-context";

export default function Log() {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.logContainer}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Text>Log event</Text>
      <Text>Log Climb</Text>
    </View>
  );
}
