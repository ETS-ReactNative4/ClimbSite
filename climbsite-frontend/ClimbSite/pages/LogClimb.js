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
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import ProfileHeader from "../components/ProfileHeader";
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function LogClimb({ navigation }) {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const token = authState.token;

  const url = `${fetch_url}/api/crags/`;
  async function getCrag() {
    try {
      const response = await axios.get(url);
      const data_received = await response.data;
      setCrag(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getCrag();
  }, []);
  const [crag, setCrag] = useState();

  async function getFavoriteCrags() {
    const url_fav = `${fetch_url}/api/climbers/get_favorites`;

    try {
      const response = await axios.get(url_fav, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setFavorites(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getFavoriteCrags();
  }, []);
  const [favorites, setFavorites] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Log Climb" />
      <ScrollView>
        {favorites && !favorites.length == 0 ? (
          <View>
            <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
              Favorites
            </Text>
            {favorites &&
              favorites.map((item) => {
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
                      onPress={() => {
                        setCragState({
                          id: item.crag.id,
                          name: item.crag.name,
                          description: item.crag.description,
                          conditions: item.crag.conditions,
                          gear: item.crag.gear,
                          longitude: item.crag.longitude,
                          latitude: item.crag.latitude,
                        });
                        navigation.navigate("Sectors");
                      }}
                    >
                      <View
                        style={{
                          marginVertical: 10,
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
                            {item.crag.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        ) : (
          <View></View>
        )}

        <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
          Crags
        </Text>
        {crag &&
          crag.map((item) => {
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
                  onPress={() => {
                    setCragState({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      conditions: item.conditions,
                      gear: item.gear,
                      longitude: item.longitude,
                      latitude: item.latitude,
                    });

                    navigation.navigate("Sectors");
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
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
