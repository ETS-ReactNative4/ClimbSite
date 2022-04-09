import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import Posts from "../components/Posts";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";
import { Feather } from "@expo/vector-icons";

export default function OthersProfile({ navigation, route }) {
  const [authState, setAuthState] = useContext(AuthContext);
  const [followingState, setFollowingState] = useState();
  const user_Id = route.params;

  const url = `${fetch_url}/api/climbers/others_info?user_id=${user_Id}`;
  async function getInfo() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setProfile(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  async function follow(item_id) {
    const token = authState.token;
    const url = `${fetch_url}/api/climbers/follow`;
    const user = {
      following: item_id,
    };

    try {
      const response = await axios.post(url, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      checkFollow();
    } catch (error) {
      console.warn(error);
    }
  }
  async function getPosts() {
    const token = authState.token;
    const url = `${fetch_url}/api/climbers/get_my_ascents?user_id=${user_Id}`;

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
    getInfo();
    getPosts();
    getFollowings();
    getFollowers();

    return () => {
      abortController.abort();
    };
  }, []);

  const [posts, setPost] = useState();

  const url_followings = `${fetch_url}/api/climbers/followings?user_id=${user_Id}`;
  async function getFollowings() {
    const token = authState.token;

    try {
      const response = await axios.get(url_followings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setFollowings(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  async function checkFollow() {
    const token = authState.token;
    const check_favorite_url = `${fetch_url}/api/climbers/follow_check?other_id=${user_Id}`;

    try {
      const response = await axios.get(check_favorite_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      if (data_received.message === "following") {
        setFollowingState(true);
      } else if (data_received.message === "not following") {
        setFollowingState(false);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function getFollowers() {
    const token = authState.token;
    const url_followers = `${fetch_url}/api/climbers/followers?user_id=${user_Id}`;
    try {
      const response = await axios.get(url_followers, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setFollowers(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  const [profile, setProfile] = useState();
  const [followings, setFollowings] = useState();
  const [followers, setFollowers] = useState();
  checkFollow();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Profile" />

      <View
        style={{
          padding: 30,
          marginTop: 20,
          backgroundColor: "#2F3F4A",
          borderRadius: 15,
          alignSelf: "center",
          display: "flex",
          width: 350,
          flexDirection: "row",
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                marginRight: 10,
              }}
              source={{ uri: profile && profile[0].profile_pic }}
            ></Image>
            <View style={{ flex: 0.7, alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: 5,
                  color: "white",
                }}
              >
                {profile && profile[0].full_name}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "100" }}>
                {profile && profile[0].email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                follow(user_Id);
              }}
              style={{ flex: 0.2, alignSelf: "center" }}
            >
              {followingState === true ? (
                <Feather name="user-check" size={24} color="#1B8B6A" />
              ) : followingState === false ? (
                <Feather name="user-plus" size={24} color="black" />
              ) : (
                <Text>test</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              width: 350,
            }}
          >
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {followers && followers.length} Followers
            </Text>
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {followings && followings.length} Followings
            </Text>
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {posts && posts.length} Ascents
            </Text>
          </View>
        </View>
      </View>
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
