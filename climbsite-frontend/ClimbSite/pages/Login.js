import React, { useState, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";
import { AntDesign } from "@expo/vector-icons";

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

  const handleLogin = async () => {
    const login_url = `${fetch_url}/api/token/`;
    if (!(data.email && data.password)) {
      setError("empty");
    } else {
      try {
        const response = await axios.post(login_url, data);

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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Text style={[styles.climbsite, { height: height * 0.1 }]}>
        <Text style={{ color: "#1B8B6A" }}>Climb</Text>Site
      </Text>
      <View style={styles.inputLogin}>
        {error === "empty" ? (
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <AntDesign name="closecircle" size={20} color="#A05B5B" />
            <Text style={{ fontSize: 16, marginLeft: 5 }}>
              One of the required field is empty.
            </Text>
          </View>
        ) : error === "wrong" ? (
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <AntDesign name="closecircle" size={20} color="#A05B5B" />
            <Text style={{ fontSize: 16, marginLeft: 5 }}>
              Your email and password do not match
            </Text>
          </View>
        ) : (
          <Text></Text>
        )}
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
    </View>
  );
}
