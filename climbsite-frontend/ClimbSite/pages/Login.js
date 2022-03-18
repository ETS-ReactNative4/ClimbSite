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

export default function Login({ navigation }) {
  const { height } = useWindowDimensions();
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={[styles.climbsite, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        <Text style={styles.headerinput}>Login </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          value={email}
          setValue={setEmail}
        />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          value={password}
          setValue={setPassword}
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
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.noaccount}>
            Don't have an account? Create an account.
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ alignSelf: "center", marginTop: 10 }}>
        <Text style={{ color: "#1B8B6A" }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
