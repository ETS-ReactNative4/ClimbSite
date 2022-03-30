import React, { useState, useEffect, useContext } from "react";
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
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import axios from "axios";

export default function Info() {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);

  async function addToFavorites(item_id) {
    const token = authState.token;
    const url_add_to_favorites =
      "http://192.168.1.54:7000/api/climbers/favorite";
    const crag_id = {
      crag: item_id,
    };

    try {
      const response = await axios.post(url_add_to_favorites, crag_id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      console.warn(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ScrollView style={{ marginTop: -10 }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <View>
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
                  {cragState.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    console.warn(cragState.id);
                    addToFavorites(cragState.id);
                  }}
                  style={{ flex: 0.1 }}
                >
                  <MaterialIcons
                    name="favorite-border"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
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
                <Text>{cragState.description}</Text>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Gear</Text>
                <Text>{cragState.gear}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Conditions
                </Text>
                <Text>{cragState.conditions}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
