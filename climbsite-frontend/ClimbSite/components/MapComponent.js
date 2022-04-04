import React, { useState } from "react";
import { styles } from "../styles";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function Map(prop) {
  const [pin, setPin] = useState({
    latitude: 33.891132639644226,
    longitude: 35.50598076837181,
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={prop.modalVisible}
      onRequestClose={prop.setModalVisible}
      style={{}}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0,0.6)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{ padding: 10, backgroundColor: "#2F3F4A", borderRadius: 15 }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
              margin: 10,
              marginBottom: 20,
            }}
          >
            Drag and Drop to set departure location:
          </Text>
          <MapView
            style={{ height: 500, width: 350 }}
            initialRegion={{
              latitude: 33.890536626710244,
              longitude: 35.789303601542964,
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
            provider="google"
          >
            <Marker
              coordinate={pin}
              pinColor="purple"
              draggable={true}
              onDragEnd={(e) => {
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
                prop.setCoordinates(e && e.nativeEvent.coordinate);
              }}
            >
              <Callout>
                <Text>I'm here</Text>
              </Callout>
            </Marker>
          </MapView>

          <TouchableOpacity
            style={{
              width: 125,
              height: 35,
              padding: 5,
              backgroundColor: "#1B8B6A",
              borderRadius: 5,
              textAlign: "center",
              marginVertical: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={() => prop.setModalVisible(false)}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                flex: 1,
                fontWeight: "bold",
              }}
            >
              Set Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
