import React, { useState } from "react";
import { styles } from "../styles";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export default function EventModal({ setModalVisible, modalVisible, item }) {
  const { height } = useWindowDimensions();
  return (
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
            padding: 20,
            width: 320,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Description
          </Text>
          <Text>{item && item.description}</Text>
          <TouchableOpacity
            style={{
              width: 80,
              height: 35,
              padding: 5,
              backgroundColor: "#1B8B6A",
              borderRadius: 5,
              textAlign: "center",
              marginVertical: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                flex: 1,
                fontWeight: "bold",
              }}
            >
              Join
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
