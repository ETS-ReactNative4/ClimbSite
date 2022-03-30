import React, { useState, useEffect, useContext } from "react";
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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import ImagePicker from "react-native-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import Posts from "../components/Posts";
import TopTabProfile from "../navigations/TopProfileNavigator";
import { AuthContext } from "../context/userContext";

export default function Profile({ navigation }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);
  const url = "http://192.168.1.54:7000/api/climbers/user_info";
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

  const url_ascents =
    "http://192.168.1.54:7000/api/climbers/get_number_ascents";
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
  const url_followings = "http://192.168.1.54:7000/api/climbers/followings";
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
  const url_followers = "http://192.168.1.54:7000/api/climbers/followers";
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
    getInfo();
    getNumberOfAscents();
    getFollowings();
    getFollowers();
  }, []);
  const [profile, setProfile] = useState();
  const [num_asc, setNum_asc] = useState();
  const [followings, setFollowings] = useState();
  const [followers, setFollowers] = useState();

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
              source={require("../assets/juan.jpeg")}
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
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {followers && followers.length} Followers
            </Text>
            <Text style={{ flex: 0.3, fontSize: 14 }}>
              {followings && followings.length} Followings
            </Text>
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
