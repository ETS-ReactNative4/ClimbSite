import React, { useState, useContext } from "react";
import { styles } from "../styles";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import axios from "axios";
import { AuthContext } from "../context/userContext";

export default function EventModal({ setModalVisible, modalVisible, item }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);

  const eventId = {
    event: item && item.id,
  };

  const handleJoin = async () => {
    console.warn(eventId);
    const token = authState.token;
    const url = "http://192.168.1.54:7000/api/events/join_event";

    // setError("empty");

    try {
      const response = await axios.post(url, eventId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      console.warn(data_received);
    } catch (error) {
      console.warn(error);
      // setError("wrong");
    }
  };

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
            onPress={handleJoin}
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
