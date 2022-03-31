import React, { useState, useContext } from "react";
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
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Login({ navigation }) {
  const { height } = useWindowDimensions();
  const [error, setError] = useState(null);
  const [authState, setAuthState] = useContext(AuthContext);
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
    const url = `${fetch_url}/api/token/`;
    if (!(data.email && data.password)) {
      setError("empty");
    } else {
      try {
        const response = await axios.post(url, data);

        const data_received = await response.data;
        setAuthState({
          signedIn: true,
          token: data_received.access,
        });

        navigation.navigate("Navbar");
      } catch (error) {
        console.warn(error);
        setError("wrong");
      }
    }
  };
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      {/* <ImageBackground
        source={require("../assets/background.jpeg")}
        resizeMode="cover"
        style={{ flex: 1, position: "relative", resizeMode: "cover" }}
      > */}
      <Text style={[styles.climbsite, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        <Text style={styles.headerinput}>Login </Text>
        <Text style={styles.inputtext}>Email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          onChangeText={(value) => handleEmail(value)}
        />
        <Text style={styles.inputtext}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(value) => handlePassword(value)}
        />
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Text style={{ color: "#1B8B6A" }}>Forgot Password?</Text>
        </TouchableOpacity>
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
      </View>

      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#6886C5" }}>
          Don't have an account? Register.
        </Text>
      </TouchableOpacity>
      {/* </ImageBackground> */}
    </View>
  );
}
