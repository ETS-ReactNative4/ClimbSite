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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";
import EventContainer from "../components/EventContainer";

export default function SearchEvent({ navigation }) {
  const { height } = useWindowDimensions();
  const [event, setEvent] = useState([
    {
      id: 1,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
      description: "dont be late",
      date: "2022-04-22",
      total_seats: 3,
      current_seats: 0,
      longitude: "45.644000",
      latitude: "795.510000",
    },
    {
      id: 2,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      crag: {
        id: 2,
        name: "beit merry",
        description: "it's bet mery",
        conditions: "hard boldery",
        gear: "60m rope",
        longitude: "448.484000",
        latitude: "841.286000",
      },
      description: "we will depart at 8 am",
      date: "2022-06-24",
      total_seats: 2,
      current_seats: 0,
      longitude: "24.400000",
      latitude: "999.999999",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="All Events" />
      <View style={{ marginTop: 10 }}>
        <EventContainer data={event} />
      </View>
    </View>
  );
}
