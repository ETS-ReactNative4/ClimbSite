import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Home({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);
  const url = `${fetch_url}/api/climbers/get_ascents`;
  async function getPosts() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setPost(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getPosts();
    });
  }, []);
  const [posts, setPost] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <View style={{ flex: 1 }}>
        {posts && !posts.length == 0 ? (
          <Posts navigation={navigation} data={posts} />
        ) : (
          <Text
            style={{
              marginVertical: 20,
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            No Posts yet
          </Text>
        )}
      </View>
    </View>
  );
}
