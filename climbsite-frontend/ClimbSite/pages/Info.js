import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import axios from "axios";
import fetch_url from "../host";

export default function Info() {
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState();

  async function addToFavorites(item_id) {
    const token = authState.token;
    const url_add_to_favorites = `${fetch_url}/api/climbers/favorite`;
    const crag_id = {
      crag: item_id,
    };

    try {
      const response = await axios.post(url_add_to_favorites, crag_id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      checkFavorite();
    } catch (error) {
      console.warn(error);
    }
  }

  async function checkFavorite() {
    const token = authState.token;
    const check_favorite = `${fetch_url}/api/climbers/if_favorite?crag_id=${cragState.id}`;

    try {
      const response = await axios.get(check_favorite, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      if (data_received.message === "is favorite") {
        setIsFavorite(true);
      } else if (data_received.message === "not favorite") {
        setIsFavorite(false);
      }
    } catch (error) {
      console.warn(error);
    }
  }
  checkFavorite();
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
                  source={{ uri: cragState.image }}
                ></Image>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", flex: 0.9 }}>
                  {cragState.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    addToFavorites(cragState.id);
                  }}
                  style={{ flex: 0.1 }}
                >
                  {isFavorite === true ? (
                    <MaterialIcons name="favorite" size={24} color="black" />
                  ) : isFavorite === false ? (
                    <MaterialIcons
                      name="favorite-border"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <View></View>
                  )}
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
