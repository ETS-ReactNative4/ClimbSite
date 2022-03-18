import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginInput from "../components/LoginInput";

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.climbsite}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <LoginInput style={styles.logincontainer} />
    </View>
  );
}
