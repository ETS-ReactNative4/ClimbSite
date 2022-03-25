import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Info() {
  const { height } = useWindowDimensions();
  const [crag, setCrag] = useState([
    {
      id: 2,
      name: "Beit merry",
      description:
        "“Der el Kalaa” is a bouldering and sport climbing crag. It has 6 sectors and 38 routes. Being 15 km from beirut makes it one of the best spots for when you do not to drive a lot or for a quick session. Disclaimer: this crag is on a private land, therefore climbers need to be mindful of crag etiquette (no camping, and leave no trace).",
      conditions:
        "East facing sector at around 650 meters above sea level, good for all seasons as even in summer the sectors are in the shade as of 12h30 pm.",
      gear: "60 meters rope, 12 quickdraws are enough as the routes are short.",
      longitude: "448.484000",
      latitude: "841.286000",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ScrollView style={{ marginTop: -10 }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          {crag.map((item) => (
            <View key={item.id}>
              <View
                style={{
                  backgroundColor: "#2F3F4A",
                  borderRadius: 15,
                  padding: 20,
                  width: 350,
                  flexDirection: "column",
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Image
                    style={{ width: 300, height: 180 }}
                    source={require("../assets/betmerry.jpg")}
                  ></Image>
                </View>
                <View style={{ marginTop: 10, flexDirection: "row" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold", flex: 0.9 }}>
                    {item.name}
                  </Text>
                  <MaterialIcons
                    style={{ flex: 0.1 }}
                    name="favorite-border"
                    size={24}
                    color="black"
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "rgba(255, 255, 255, 0.25)",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                  }}
                />
                <View style={{ marginBottom: 5 }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Description
                  </Text>
                  <Text>{item.description}</Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>Gear</Text>
                  <Text>{item.gear}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Conditions
                  </Text>
                  <Text>{item.conditions}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
