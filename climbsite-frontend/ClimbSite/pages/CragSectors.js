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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import SectorContainer from "../components/SectorContainer";
import ProfileHeader from "../components/ProfileHeader";
import { CragContext } from "../context/cragContext";
import { AuthContext } from "../context/userContext";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function CragSectors({ navigation }) {
  const { height } = useWindowDimensions();
  const [cragState, setCragState] = useContext(CragContext);
  const [selectedSector, setSelectedSector] = useState();
  const [authState, setAuthState] = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const selectedCragId = cragState.id;
  const [test, SetTest] = useState("test1");

  const url = `http://192.168.1.54:7000/api/crags/sectors?crag_id=${selectedCragId}`;
  async function getSectors() {
    const token = authState.token;

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
    const url_route = `http://192.168.1.54:7000/api/crags/routes?sector_id=${sector_id}`;
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
  // const [route, setRoute] = useState([
  //   {
  //     id: 1,
  //     name: "test",
  //     sector: {
  //       id: 1,
  //       name: "sector 1",
  //       crag: {
  //         id: 2,
  //         name: "beit merry",
  //         description: "it's bet mery",
  //         conditions: "hard boldery",
  //         gear: "60m rope",
  //         longitude: "448.484000",
  //         latitude: "841.286000",
  //       },
  //     },
  //     grade: "6a",
  //   },
  //   {
  //     id: 2,
  //     name: "tesy2",
  //     sector: {
  //       id: 1,
  //       name: "sector 1",
  //       crag: {
  //         id: 2,
  //         name: "beit merry",
  //         description: "it's bet mery",
  //         conditions: "hard boldery",
  //         gear: "60m rope",
  //         longitude: "448.484000",
  //         latitude: "841.286000",
  //       },
  //     },
  //     grade: "5a",
  //   },
  //   {
  //     id: 3,
  //     name: "lol",
  //     sector: {
  //       id: 1,
  //       name: "sector 1",
  //       crag: {
  //         id: 2,
  //         name: "beit merry",
  //         description: "it's bet mery",
  //         conditions: "hard boldery",
  //         gear: "60m rope",
  //         longitude: "448.484000",
  //         latitude: "841.286000",
  //       },
  //     },
  //     grade: "5",
  //   },
  // ]);
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
              flexDirection: "row",
            }}
          >
            <FlatList
              key={(item) => item.id}
              data={route && route}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>{item.name} </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "rgba(255, 255, 255, 0.25)",
                      borderBottomWidth: 1,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
