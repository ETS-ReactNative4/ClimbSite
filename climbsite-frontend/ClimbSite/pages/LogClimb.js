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
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import ProfileHeader from "../components/ProfileHeader";

export default function LogClimb({ navigation }) {
  const { height } = useWindowDimensions();
  const [crag, setCrag] = useState([
    {
      id: 2,
      name: "Beit merry",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: 33.890536626710244,
      latitude: 35.489303601542964,
    },
    {
      id: 3,
      name: "Tannourine",
      description: "it's Tannourine",
      conditions: "hard tannourine",
      gear: "80m rope",
      longitude: 34.890536626710244,
      latitude: 36.489303601542964,
    },
    {
      id: 7,
      name: "Beit merry",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: 33.890536626710244,
      latitude: 35.489303601542964,
    },
    {
      id: 8,
      name: "Tannourine",
      description: "it's Tannourine",
      conditions: "hard tannourine",
      gear: "80m rope",
      longitude: 34.890536626710244,
      latitude: 36.489303601542964,
    },
  ]);
  const [favorites, setFavorites] = useState([
    {
      id: 4,
      name: "Tannourine",
      description: "it's Tannourine",
      conditions: "hard tannourine",
      gear: "80m rope",
      longitude: 35.890536626710244,
      latitude: 37.489303601542964,
    },
    {
      id: 5,
      name: "Chabrouh",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: 38.890536626710244,
      latitude: 35.489303601542964,
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Log Climb" />
      <ScrollView>
        <Text>favorites</Text>
        {favorites.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("Crag");
              // }}
              >
                <View
                  style={{
                    margin: 20,
                    backgroundColor: "#2F3F4A",
                    borderRadius: 15,
                    padding: 20,
                    width: 320,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 0.3 }}>
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={require("../assets/betmerry.jpg")}
                    ></Image>
                  </View>
                  <View style={{ flex: 0.8, marginLeft: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        <Text>Others</Text>
        {crag.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("Crag");
              // }}
              >
                <View
                  style={{
                    margin: 20,
                    backgroundColor: "#2F3F4A",
                    borderRadius: 15,
                    padding: 20,
                    width: 320,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 0.3 }}>
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={require("../assets/betmerry.jpg")}
                    ></Image>
                  </View>
                  <View style={{ flex: 0.8, marginLeft: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
