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
import ClimblistRoutes from "../components/ClimblistRoutes";

export default function Climblist({ navigation }) {
  const { height } = useWindowDimensions();
  const [route, setRoute] = useState([
    {
      id: 1,
      name: "test",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "6a",
    },
    {
      id: 2,
      name: "tesy2",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "5a",
    },
    {
      id: 3,
      name: "lol",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "5",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ClimblistRoutes data={route} />
    </View>
  );
}
