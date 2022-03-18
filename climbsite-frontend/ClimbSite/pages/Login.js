import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export default function Login({ navigation }) {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={[styles.climbsite, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        <Text style={styles.headerinput}>Login </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput style={styles.input} placeholder="Email..." />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput style={styles.input} placeholder="Password..." />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ alignSelf: "center", fontSize: 17, flex: 1 }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.noaccount}>
            Don't have an account? Create an account.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
