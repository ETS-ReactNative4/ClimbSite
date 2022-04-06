import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import EventContainer from "../components/EventContainer";
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function CragEvents() {
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);

  async function getEvents() {
    const token = authState.token;
    const url = `${fetch_url}/api/events/?crag_id=${cragState && cragState.id}`;

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
      <View style={{ marginTop: -30 }}>
        <EventContainer data={event && event} />
      </View>
    </View>
  );
}
