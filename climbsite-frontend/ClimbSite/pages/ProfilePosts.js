import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import { Text, View } from "react-native";
import Posts from "../components/Posts";
import fetch_url from "../host";

export default function ProfilePosts({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);
  const url = `${fetch_url}/api/climbers/get_my_ascents`;
  async function getMyPosts() {
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
    let abortController = new AbortController();

    navigation.addListener("focus", () => {
      getMyPosts();
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const [posts, setPost] = useState();

  return (
    <View style={styles.container}>
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
  );
}
