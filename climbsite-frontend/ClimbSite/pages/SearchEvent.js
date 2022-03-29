import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import EventContainer from "../components/EventContainer";
import { AuthContext } from "../context/userContext";

export default function SearchEvent({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);

  async function getEvents() {
    const token = authState.token;
    const url = "http://192.168.1.54:7000/api/events/";

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setEvent(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getEvents();
  }, []);
  const [event, setEvent] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="All Events" />
      <View style={{ marginTop: 10 }}>
        <EventContainer data={event && event} />
      </View>
    </View>
  );
}
