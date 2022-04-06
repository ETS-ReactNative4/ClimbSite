import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Community({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);

  const url_users = `${fetch_url}/api/climbers/get_users`;
  async function getUsers() {
    const token = authState.token;

    try {
      const response = await axios.get(url_users, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setUsers(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  async function follow(item_id, name) {
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
      Alert.alert("You now follow " + name);
      getFollowings();
      getUsers();
    } catch (error) {
      console.warn(error);
    }
  }

  const [users, setUsers] = useState([]);

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
  const [followings, setFollowings] = useState([]);

  const following = [];
  followings.forEach((element) => {
    following.push(element.following);
  });

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  }
  var notFollowing = getDifference(users, following);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getFollowings();
      getUsers();
    });
  }, []);

  console.log(notFollowing);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
        Climbers you may know...
      </Text>
      <FlatList
        key={(item) => item.id}
        data={notFollowing}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Others Profile", item.id);
            }}
            style={{
              padding: 20,
              marginHorizontal: 30,
              backgroundColor: "#2F3F4A",
              borderRadius: 15,
              alignSelf: "center",
              display: "flex",
              width: 350,
              margin: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={{ flex: 0.2, marginRight: 20 }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                  source={{ uri: item.profile_pic }}
                ></Image>
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "100" }}>
                  {item.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                follow(item.id, item.full_name);
              }}
              style={{ flex: 0.1, alignSelf: "center" }}
            >
              <Feather name="user-plus" size={24} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
