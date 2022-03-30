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
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={prop.modalVisible}
      onRequestClose={prop.setModalVisible}
    >
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          latitude: 33.890536626710244,
          longitude: 35.489303601542964,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          pinColor="purple"
          draggable={true}
          onDragEnd={(e) => {
            console.warn("Drag end", e.nativeEvent.coordinate),
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
        style={styles.loginButton}
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
          close
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}
