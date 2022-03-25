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
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import SectorContainer from "../components/SectorContainer";
import ProfileHeader from "../components/ProfileHeader";

export default function CragSectors({ navigation }) {
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
  const [sector, setSector] = useState([
    {
      id: 3,
      name: "sector3",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
    {
      id: 4,
      name: "sector4",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
    {
      id: 5,
      name: "sector1",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>

      <View style={{ marginTop: -30 }}>
        <SectorContainer data={sector} rowData={route} />
      </View>
    </View>
  );
}
