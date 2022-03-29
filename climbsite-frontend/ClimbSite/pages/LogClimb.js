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

export default function LogClimb({ navigation }) {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const token = authState.token;

  const url = "http://192.168.1.54:7000/api/crags/";
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
  // const [crag, setCrag] = useState([
  //   {
  //     id: 2,
  //     name: "Beit merry",
  //     description: "it's bet mery",
  //     conditions: "hard boldery",
  //     gear: "60m rope",
  //     longitude: 33.890536626710244,
  //     latitude: 35.489303601542964,
  //   },
  //   {
  //     id: 3,
  //     name: "Tannourine",
  //     description: "it's Tannourine",
  //     conditions: "hard tannourine",
  //     gear: "80m rope",
  //     longitude: 34.890536626710244,
  //     latitude: 36.489303601542964,
  //   },
  //   {
  //     id: 7,
  //     name: "Beit merry",
  //     description: "it's bet mery",
  //     conditions: "hard boldery",
  //     gear: "60m rope",
  //     longitude: 33.890536626710244,
  //     latitude: 35.489303601542964,
  //   },
  //   {
  //     id: 8,
  //     name: "Tannourine",
  //     description: "it's Tannourine",
  //     conditions: "hard tannourine",
  //     gear: "80m rope",
  //     longitude: 34.890536626710244,
  //     latitude: 36.489303601542964,
  //   },
  // ]);

  async function getFavoriteCrags() {
    const url_fav = "http://192.168.1.54:7000/api/climbers/get_favorites";

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
  // const [favorites, setFavorites] = useState([
  //   {
  //     id: 6,
  //     user: {
  //       id: 8,
  //       full_name: "Cyril Asmar",
  //       email: "cyro@hotmail.com",
  //     },
  //     crag: {
  //       id: 2,
  //       name: "beit merry",
  //       description: "it's bet mery",
  //       conditions: "hard boldery",
  //       gear: "60m rope",
  //       longitude: "35.000000",
  //       latitude: "36.000000",
  //     },
  //   },
  // ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Log Climb" />
      <ScrollView>
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
        <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
          Others
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
