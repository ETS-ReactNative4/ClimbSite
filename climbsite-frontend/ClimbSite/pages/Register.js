import React from "react";
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

export default function Register({ navigation }) {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={[styles.signupHeader, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Create</Text> Account
      </Text>
      <View style={styles.inputRegister}>
        <Text style={styles.headerinput}>Sign Up </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput style={styles.input} placeholder="Email..." />
        <Text style={styles.inputtext}>Enter your full name: </Text>
        <TextInput style={styles.input} placeholder="Full Name..." />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          secureTextEntry={true}
        />
        <Text style={styles.inputtext}>Confirm your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password..."
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.noaccount}>Already have an account? Login.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
