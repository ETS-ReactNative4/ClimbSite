import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EventModal from "./EventModal";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";
import axios from "axios";

export default function EventContainer({ data }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [state, setState] = useState();
  const [authState, setAuthState] = useContext(AuthContext);

  async function checkEvent(event_id) {
    console.warn(event_id);
    const token = authState.token;
    const url = `${fetch_url}/api/events/check_event_status?event_id=${event_id}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;

      if (data_received.message === "delete") {
        setState("delete");
      } else if (data_received.message === "join") {
        setState("join");
      } else if (data_received.message === "unjoin") {
        setState("unjoin");
      }
      setModalVisible(true);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={{ marginTop: -5 }}>
      <FlatList
        key={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              // setModalVisible(true);
              checkEvent(item.id);
            }}
          >
            <View
              style={{
                padding: 20,
                backgroundColor: "#2F3F4A",
                borderRadius: 15,
                alignSelf: "center",
                display: "flex",
                width: 320,
                marginTop: 20,
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    justifyConten: "center",
                  }}
                >
                  <View style={{ flex: 0.7 }}>
                    <Text style={{ fontSize: 20, color: "#1B8B6A" }}>
                      {item.crag.name}
                    </Text>
                    <Text style={{ color: "white" }}>{item.sector.name}</Text>
                  </View>
                  <Text style={{ color: "white", flex: 0.3, marginBottom: 13 }}>
                    {item.date}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 16, color: "white", flex: 0.7 }}>
                    {item.user.full_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "100",
                      color: "white",
                      flex: 0.6,
                    }}
                  >
                    Places Available: {item.total_seats - item.current_seats}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <EventModal
        setModalVisible={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
        item={selectedItem && selectedItem}
        state={state}
      />
    </View>
  );
}
