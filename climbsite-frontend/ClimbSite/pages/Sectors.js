import React, { useState, useContext, useEffect } from "react";
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
import { CragContext } from "../context/cragContext";
import axios from "axios";

export default function Sectors({ navigation }) {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);

  const selectedCragId = cragState.id;

  const url = `http://192.168.1.54:7000/api/crags/sectors?crag_id=${selectedCragId}`;
  async function getSectors() {
    try {
      const response = await axios.get(url);
      const data_received = await response.data;
      setSector(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getSectors();
  }, []);

  const [sector, setSector] = useState();

  const [routes, setRoute] = useState([
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
  // const [sector, setSector] = useState([
  //   {
  //     id: 3,
  //     name: "sector3",
  //     crag: {
  //       id: 1,
  //       name: "tanourine",
  //       description: "it is in tanourine and has 5 routes",
  //       conditions: "very hard",
  //       gear: "90 m",
  //       longitude: "585.454000",
  //       latitude: "355.544000",
  //     },
  //   },
  //   {
  //     id: 4,
  //     name: "sector4",
  //     crag: {
  //       id: 1,
  //       name: "tanourine",
  //       description: "it is in tanourine and has 5 routes",
  //       conditions: "very hard",
  //       gear: "90 m",
  //       longitude: "585.454000",
  //       latitude: "355.544000",
  //     },
  //   },
  //   {
  //     id: 5,
  //     name: "sector1",
  //     crag: {
  //       id: 1,
  //       name: "tanourine",
  //       description: "it is in tanourine and has 5 routes",
  //       conditions: "very hard",
  //       gear: "90 m",
  //       longitude: "585.454000",
  //       latitude: "355.544000",
  //     },
  //   },
  // ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader title="Sectors" navigation={navigation} />
      <View style={{ marginVertical: 10 }}>
        <SectorContainer
          data={sector && sector}
          rowData={routes}
          Buttontext="Select Route Climbed:"
          icon={<AntDesign name="check" size={24} color="black" />}
        />
      </View>
    </View>
  );
}
