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

export default function Register({ navigation }) {
  const { height } = useWindowDimensions();
  const [error, setError] = useState(null);
  const url = "http://192.168.1.54:7000/api/climbers/register";
  const [data, setData] = useState({
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  });

  const handleEmail = (value) => {
    setData({
      ...data,
      email: value,
    });
  };
  const handleName = (value) => {
    setData({
      ...data,
      full_name: value,
    });
  };
  const handlePassword = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPassword = (value) => {
    setData({
      ...data,
      confirm_password: value,
    });
  };

  async function handleSubmit() {
    if (!(data.email && data.password && data.full_name)) {
      console.warn("empty");
      setError("empty");
    } else if (data.password.length < 8) {
      setError("weak");
      console.warn("weak");
    } else if (!(data.password === data.confirm_password)) {
      setError("confirm");
      console.warn("confirm");
    } else {
      const user_signup_info = {
        email: data.email,
        full_name: data.full_name,
        password: data.password,
      };
      console.warn(user_signup_info);

      try {
        const response = await axios.post(url, user_signup_info);
        const data_received = await response.data;
        console.log(data_received);
        navigation.navigate("Login");
        console.warn("loggedin");
      } catch (error) {
        console.log(error);
        setError("already exist");
        console.warn("already exist");
      }
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Text style={[styles.signupHeader, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Create</Text> Account
      </Text>
      <View style={styles.inputRegister}>
        <Text style={styles.headerinput}>Sign Up </Text>
        <Text style={styles.inputtext}>Enter your email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          onChangeText={(value) => handleEmail(value)}
        />
        <Text style={styles.inputtext}>Enter your full name: </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name..."
          onChangeText={(value) => handleName(value)}
        />
        <Text style={styles.inputtext}>Enter your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          onChangeText={(value) => handlePassword(value)}
          secureTextEntry={true}
        />
        <Text style={styles.inputtext}>Confirm your password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password..."
          onChangeText={(value) => handleConfirmPassword(value)}
          secureTextEntry={true}
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
