import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SectorContainer from "../components/SectorContainer";
import ProfileHeader from "../components/ProfileHeader";
import { CragContext } from "../context/cragContext";
import axios from "axios";
import fetch_url from "../host";

export default function Sectors({ navigation }) {
  const [cragState, setCragState] = useContext(CragContext);

  const selectedCragId = cragState.id;

  const sectors_url = `${fetch_url}/api/crags/sectors?crag_id=${selectedCragId}`;
  async function getSectors() {
    try {
      const response = await axios.get(sectors_url);
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader title="Sectors" navigation={navigation} />
      <View style={{ marginVertical: 10 }}>
        <SectorContainer
          data={sector && sector}
          Buttontext="Select Route Climbed:"
        />
      </View>
    </View>
  );
}
