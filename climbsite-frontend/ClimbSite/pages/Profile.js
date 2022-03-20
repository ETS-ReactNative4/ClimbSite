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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const { height } = useWindowDimensions();
  const [profile, setPost] = useState([
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
      <ProfileHeader navigation={navigation} />

      <View style={styles.profile}>
        {profile.map((item) => (
          <View key={item.id}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                style={{ marginRight: 10 }}
                name="user-circle"
                size={65}
                color="black"
              />
              <View>
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}
                >
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "100" }}>
                  {item.country}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
