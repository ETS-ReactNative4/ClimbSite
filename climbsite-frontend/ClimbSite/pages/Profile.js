import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
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

export default function Profile({ navigation }) {
  const { height } = useWindowDimensions();
  const [profile, setProfile] = useState([
    {
      id: 8,
      full_name: "Cyril Asmar",
      email: "cyro@hotmail.com",
      dob: "1990-12-04",
      followers: "25",
      followings: "50",
      country: "Lebanese",
      asc: "34",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Profile" />

      <View style={styles.profile}>
        {profile.map((item) => (
          <View key={item.id}>
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
                  style={{ fontSize: 22, fontWeight: "bold", marginTop: 5 }}
                >
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "100" }}>
                  {item.country}
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
                {item.followers} Followers
              </Text>
              <Text style={{ flex: 0.3, fontSize: 14 }}>
                {item.followings} Followings
              </Text>
              <Text style={{ flex: 0.3, fontSize: 14 }}>
                {item.asc} Ascents
              </Text>
            </View>
          </View>
        ))}
      </View>
      <TopTabProfile />
    </View>
  );
}
