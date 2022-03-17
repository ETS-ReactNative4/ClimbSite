import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginInput from "../components/LoginInput";

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.climbsite}>ClimbSite</Text>
      <LoginInput style={styles.logincontainer} />
    </View>
  );
}
