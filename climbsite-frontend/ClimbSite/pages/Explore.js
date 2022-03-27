import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/userContext";
import { CragContext } from "../context/cragContext";

export default function Explore({ navigation }) {
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);

  const url = "http://192.168.1.54:7000/api/crags/";
  async function getInfo() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setCrag(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  const [crag, setCrag] = useState();

  return (
    <View
      style={{
        backgroundColor: "#122222",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        zIndex: -1,
      }}
    >
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 675,
        }}
        initialRegion={{
          latitude: 33.787395,
          longitude: 35.72789,
          latitudeDelta: 1.8,
          longitudeDelta: 1.8,
        }}
      >
        {crag &&
          crag.map((item) => {
            return (
              <View key={item.id}>
                <MapView.Marker
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

                    setModalVisible(true);
                  }}
                  pinColor="#1B8B6A"
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}
                  title={item.name}
                />
              </View>
            );
          })}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Crag");
              setModalVisible(!modalVisible);
            }}
            style={{
              backgroundColor: "#2F3F4A",
              width: 320,
              margin: 20,
              borderRadius: 15,
              padding: 20,
            }}
          >
            <View
              style={{
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
                  {cragState && cragState.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles1 = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    zIndex: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
