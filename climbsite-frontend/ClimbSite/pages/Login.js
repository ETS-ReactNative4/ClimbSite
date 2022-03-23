import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const { height } = useWindowDimensions();
  const [error, setError] = useState(null);
  const url = "http://127.0.0.1:7000/api/token/";
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (value) => {
    setData({
      ...data,
      email: value,
    });
  };
  const handlePassword = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleSubmit = async () => {
    navigation.navigate("Navbar");
    if (!(data.email && data.password)) {
      setError("empty");
    } else {
      try {
        const response = await axios.post(url, data);
        const data_received = await response.data;
        console.log(data_received);
        // localStorage.setItem("token", data_received.access_token);
        // localStorage.setItem("name", data_received.user.name);
        // localStorage.setItem("email", data_received.user.email);
      } catch (error) {
        console.log(error);
        setError("wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Text style={[styles.climbsite, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        <Text style={styles.headerinput}>Login </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          onChangeText={(value) => handleEmail(value)}
        />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(value) => handlePassword(value)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
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
