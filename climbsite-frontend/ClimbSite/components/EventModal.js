import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
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

  const handleJoinEvent = async () => {
    const token = authState.token;
    const url = `${fetch_url}/api/events/join_event`;

    // setError("empty");

    try {
      const response = await axios.post(url, eventId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      setModalVisible(false);
      if (data_received.message == "you joined the event") {
        Alert.alert("You joined the event");
      } else if (data_received.message == "you unjoined the event") {
        Alert.alert("You unjoined the event");
      } else if (data_received.message == "you created this event") {
        Alert.alert("You deleted the event");
      } else if (data_received.message == "full") {
        Alert.alert("This event is full");
      }
      // checkEvent;
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
          {state === "delete" ? (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                color: "#1B8B6A",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              You created this event
            </Text>
          ) : state === "join" ? (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                color: "#1B8B6A",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Join Event
            </Text>
          ) : state === "unjoin" ? (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                color: "#1B8B6A",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              You are joining this event
            </Text>
          ) : (
            <></>
          )}

          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Description
          </Text>
          <Text>{item && item.description}</Text>
          <TouchableOpacity
            onPress={() => {
              handleJoinEvent();
            }}
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
