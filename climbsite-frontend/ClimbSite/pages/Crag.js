import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CragHeader from "../components/CragHeader";
import TopTab from "../navigations/TopCargNavigatore";

export default function Crag({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <CragHeader cragName="Crag Name" navigation={navigation} />
      <TopTab />
    </View>
  );
}
