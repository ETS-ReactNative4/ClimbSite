import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Map() {
  const [pin, setPin] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
  });

  return (
    <View>
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
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}
