import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";

import TopTabProfile from "../navigations/TopProfileNavigator";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Profile({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);
  const url = `${fetch_url}/api/climbers/user_info`;

  const [profile, setProfile] = useState();
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

  const url_ascents = `${fetch_url}/api/climbers/get_number_ascents`;
  async function getNumberOfAscents() {
    const token = authState.token;

    try {
      const response = await axios.get(url_ascents, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setNum_asc(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  const url_followings = `${fetch_url}/api/climbers/followings`;
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
  const url_followers = `${fetch_url}/api/climbers/followers`;
  async function getFollowers() {
    const token = authState.token;

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

  useEffect(() => {
    navigation.addListener("focus", () => {
      getInfo();
      getNumberOfAscents();
      getFollowings();
      getFollowers();
    });
  }, []);

  const [num_asc, setNum_asc] = useState();
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const following = [];
  followings.forEach((element) => {
    following.push(element.following);
  });
  const follower = [];
  followers.forEach((element) => {
    follower.push(element.follower);
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Profile" />

      <View style={styles.profile}>
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
            <View>
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
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              width: 350,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Followings", {
                  item: follower,
                  otherParam: "Followers",
                });
              }}
              style={{ flex: 0.3 }}
            >
              <Text style={{ fontSize: 14 }}>
                {followers && followers.length} Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.3 }}
              onPress={() => {
                navigation.navigate("Followings", {
                  item: following,
                  otherParam: "Followings",
                });
              }}
            >
              <Text style={{ fontSize: 14 }}>
                {followings && followings.length} Followings
              </Text>
            </TouchableOpacity>
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {num_asc && num_asc.ascents} Ascents
            </Text>
          </View>
        </View>
      </View>
      <TopTabProfile />
    </View>
  );
}
