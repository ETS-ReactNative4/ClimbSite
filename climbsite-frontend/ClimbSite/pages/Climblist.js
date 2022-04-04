import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import EventContainer from "../components/EventContainer";
import ClimblistRoutes from "../components/ClimblistRoutes";
import fetch_url from "../host";

export default function Climblist({ navigation }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);
  const [route, setRoute] = useState();

  const url = `${fetch_url}/api/climbers/climblist`;
  async function getClimblist() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setRoute(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    let abortController = new AbortController();
    navigation.addListener("focus", () => {
      getClimblist();
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      {route && !route.length == 0 ? (
        <ClimblistRoutes data={route && route} />
      ) : (
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          No Routes to climb yet
        </Text>
      )}
    </View>
  );
}
