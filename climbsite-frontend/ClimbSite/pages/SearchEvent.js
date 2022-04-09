import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import EventContainer from "../components/EventContainer";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function SearchEvent({ navigation }) {
  const [authState, setAuthState] = useContext(AuthContext);

  async function getEvents() {
    const token = authState.token;
    const events_url = `${fetch_url}/api/events/`;

    try {
      const response = await axios.get(events_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setEvent(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getEvents();
    });
  }, []);
  const [event, setEvent] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="All Events" />
      <View style={{ marginBottom: 100, marginTop: 5 }}>
        <EventContainer data={event && event} />
      </View>
    </View>
  );
}
