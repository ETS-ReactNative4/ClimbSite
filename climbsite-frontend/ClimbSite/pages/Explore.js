import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
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

export default function Explore({ navigation }) {
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
  });
  const [region, setRegion] = useState({
    latitude: 33.787395,
    longitude: 35.72789,
  });

  const [selectedId, setSelectedId] = useState();
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
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        {/* <Marker
          coordinate={pin}
          pinColor="purple"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate),
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker> */}
        {/* <MapView.Marker
          coordinate={{
            longitude: 35.59988484,
            latitude: 33.797395,
          }}
          pinColor="purple"
          onPress={() => setModalVisible(true)}
        ></MapView.Marker> */}
        {crag.map((item) => {
          return (
            <View key={item.id}>
              <MapView.Marker
                onPress={() => {
                  setSelectedId(item);
                  setModalVisible(true);
                }}
                pinColor="#1B8B6A"
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={"Crag location"}
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
        <View
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
                  {selectedId && selectedId.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
