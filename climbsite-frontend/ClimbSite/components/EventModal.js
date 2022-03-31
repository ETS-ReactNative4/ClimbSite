import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";
import { useFocusEffect } from "@react-navigation/native";

export default function EventModal({
  setModalVisible,
  modalVisible,
  item,
  state,
}) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);

  const eventId = {
    event: item && item.id,
  };

  const handleJoin = async () => {
    console.warn(eventId);
    const token = authState.token;
    const url = `${fetch_url}/api/events/join_event`;

    // setError("empty");

    try {
      const response = await axios.post(url, eventId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      console.warn(await data_received);
      // checkEvent;
    } catch (error) {
      console.warn(error);
      // setError("wrong");
    }
  };

  // async function checkEvent() {
  //   console.warn(item.id);
  //   const token = authState.token;
  //   const url = `${fetch_url}/api/events/check_event_status?event_id=${item.id}`;

  //   try {
  //     const response = await axios.get(url, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data_received = await response.data;

  //     if (data_received.message === "delete") {
  //       setState("delete");
  //     } else if (data_received.message === "join") {
  //       setState("join");
  //     } else if (data_received.message === "unjoin") {
  //       setState("unjoin");
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }
  // useEffect(() => {
  //   checkEvent();
  // }, [modalVisible]);

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
            {state === "delete" ? (
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 17,
                  flex: 1,
                  fontWeight: "bold",
                }}
              >
                Delete
              </Text>
            ) : state === "join" ? (
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
            ) : state === "unjoin" ? (
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 17,
                  flex: 1,
                  fontWeight: "bold",
                }}
              >
                Unjoin
              </Text>
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
