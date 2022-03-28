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
    const url = "http://192.168.1.54:7000/api/token/";
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

        // const token = data_received.access;
        // await SecureStore.setItemAsync("token", JSON.stringify(token));s
        // save("token", data_received.access);
        // console.warn(await SecureStore.getItemAsync("token"));

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
      {/* </ImageBackground> */}
    </View>
  );
}
