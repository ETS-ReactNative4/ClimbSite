import React, { useState } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header({ navigation }) {
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
      date: "2022-04-22T00:00:00Z",
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
      date: "2022-06-24T00:00:00Z",
      total_seats: 2,
      current_seats: 0,
      longitude: "24.400000",
      latitude: "999.999999",
    },
  ]);
  return (
    <FlatList
      style={{ marginTop: 10 }}
      key={(item) => item.id}
      data={event}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 130 }}>
              <Text style={{ fontSize: 18, color: "#1B8B6A" }}>
                {item.crag.name}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "100", color: "white" }}>
                {item.route.sector.crag.name}
              </Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {item.user.full_name}
              </Text>
            </View>
            <View style={{ marginLeft: 80 }}>
              <Text>{item.date} </Text>
              <View style={{ marginVertical: 8 }}>{star}</View>
              <Text style={{ fontSize: 14, fontWeight: "100", color: "white" }}>
                Tries: {item.tries}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "rgba(255, 255, 255, 0.25)",
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />
          <View>
            <Text style={{ fontSize: 14, lineHeight: 18 }}>{item.comment}</Text>
          </View>
        </View>
      )}
    />
  );
}
