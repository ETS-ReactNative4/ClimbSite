import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import SectorContainer from "../components/SectorContainer";
import ProfileHeader from "../components/ProfileHeader";
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import fetch_url from "../host";

export default function CragSectors({ navigation }) {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);
  const [selectedSector, setSelectedSector] = useState();
  const [authState, setAuthState] = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const selectedCragId = cragState.id;

  const url = `${fetch_url}/api/crags/sectors?crag_id=${selectedCragId}`;
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

  async function getRoute(sector_id) {
    const url_route = `${fetch_url}/api/crags/routes?sector_id=${sector_id}`;
    try {
      const response = await axios.get(url_route);
      const data_received = await response.data;
      setRoute(data_received);
      setModalVisible(true);
    } catch (error) {
      console.warn(error);
    }
  }

  const [route, setRoute] = useState();

  async function addToClimblist(item_id) {
    const token = authState.token;
    const url_add_to_climblist = `${fetch_url}/api/climbers/add_to_climblist`;
    const route_id = {
      route: item_id,
    };

    try {
      const response = await axios.post(url_add_to_climblist, route_id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      if (data_received.message == "already climbed") {
        Alert.alert("You already climbed this route");
      } else if (data_received.message == "already in list") {
        Alert.alert("This route is already in your Climblist");
      } else {
        Alert.alert("This route has been added to your Climblist");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>

      <View style={{ marginTop: -30 }}>
        <View>
          {sector &&
            sector.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      getRoute(item && item.id);
                    }}
                    style={{
                      backgroundColor: "#2F3F4A",
                      borderRadius: 15,
                      padding: 20,
                      width: 320,
                      height: 65,
                      alignSelf: "center",
                      marginTop: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        marginLeft: 20,
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        marginLeft: 20,
                        fontSize: 12,
                      }}
                    >
                      Add Route to your list:
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#2F3F4A",
              borderRadius: 15,

              width: 320,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 10,
                color: "white",
                alignSelf: "center",
              }}
            >
              Add to your list
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FlatList
                key={(item) => item.id}
                data={route && route}
                renderItem={({ item }) => (
                  <Pressable>
                    <View
                      style={{
                        height: 50,
                        marginLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, flex: 0.8 }}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            addToClimblist(item && item.id);
                          }}
                          style={{ flex: 0.2 }}
                        >
                          <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "rgba(255, 255, 255, 0.25)",
                        borderBottomWidth: 1,
                      }}
                    />
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
