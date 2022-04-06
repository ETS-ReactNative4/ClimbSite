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
  ScrollView,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EventModal from "./EventModal";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";
import axios from "axios";
import { format } from "date-fns";

export default function EventContainer({ data }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [state, setState] = useState();
  const [authState, setAuthState] = useContext(AuthContext);
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  async function checkEvent(event_id) {
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
      <ScrollView>
        <View>
          <Text style={{ marginLeft: 45, marginTop: 20, fontSize: 20 }}>
            Upcoming Events
          </Text>
          {data &&
            data.map((item) => {
              return (
                <View key={item.id}>
                  {item.date >= formattedDate ? (
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
                              <Text style={{ color: "white" }}>
                                {item.sector.name}
                              </Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                              <Text style={{ color: "white" }}>
                                {item.date}
                              </Text>
                              <Text style={{}}>Upcoming</Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flex: 0.7,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: "white",
                                  flex: 0.7,
                                }}
                              >
                                {item.user.full_name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "100",
                                  color: "white",
                                }}
                              >
                                Places Available:{" "}
                                {item.total_seats - item.current_seats}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                Linking.openURL(
                                  `whatsapp://send?text=Hello fellow climber! Saw you had an event coming up&phone=${item.user.phone_number}`
                                );
                              }}
                              style={{
                                width: 90,
                                height: 35,
                                padding: 5,
                                backgroundColor: "#1B8B6A",
                                borderRadius: 5,
                                textAlign: "center",
                                marginTop: 10,
                                flex: 0.3,
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
                                Contact
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}

          <Text style={{ marginLeft: 45, marginTop: 20, fontSize: 20 }}>
            Passed Events
          </Text>
          {data &&
            data.map((item) => {
              return (
                <View key={item.id}>
                  {item.date < formattedDate ? (
                    <TouchableOpacity disabled>
                      <View
                        style={{
                          padding: 20,
                          backgroundColor: "rgba(47, 63, 74, 0.4)",
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
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "rgba(255, 255, 255, 0.25)",
                                }}
                              >
                                {item.crag.name}
                              </Text>
                              <Text
                                style={{ color: "rgba(255, 255, 255, 0.25)" }}
                              >
                                {item.sector.name}
                              </Text>
                            </View>
                            <Text
                              style={{
                                color: "rgba(255, 255, 255, 0.25)",
                                flex: 0.3,
                                marginBottom: 13,
                              }}
                            >
                              {item.date}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "rgba(255, 255, 255, 0.25)",
                                flex: 0.7,
                              }}
                            >
                              {item.user.full_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "100",
                                color: "rgba(255, 255, 255, 0.25)",
                                flex: 0.6,
                              }}
                            >
                              Places Available:{" "}
                              {item.total_seats - item.current_seats}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}
          {/* <FlatList
            keyExtractor={(item, index) => item.id}
            data={data}
            renderItem={({ item }) => (
              <View>
                {item.date >= formattedDate ? (
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
                            <Text style={{ color: "white" }}>
                              {item.sector.name}
                            </Text>
                          </View>
                          <View style={{ flex: 0.3 }}>
                            <Text style={{ color: "white" }}>{item.date}</Text>
                            <Text style={{}}>Upcoming</Text>
                          </View>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{ fontSize: 16, color: "white", flex: 0.7 }}
                          >
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
                            Places Available:{" "}
                            {item.total_seats - item.current_seats}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            )}
          /> */}
        </View>
        <View>
          {/* <FlatList
            keyExtractor={(item, index) => item.id}
            data={data}
            renderItem={({ item }) => (
              <View>
                {item.date < formattedDate ? (
                  <TouchableOpacity disabled>
                    <View
                      style={{
                        padding: 20,
                        backgroundColor: "rgba(47, 63, 74, 0.4)",
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
                            <Text
                              style={{
                                fontSize: 20,
                                color: "rgba(255, 255, 255, 0.25)",
                              }}
                            >
                              {item.crag.name}
                            </Text>
                            <Text
                              style={{ color: "rgba(255, 255, 255, 0.25)" }}
                            >
                              {item.sector.name}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "rgba(255, 255, 255, 0.25)",
                              flex: 0.3,
                              marginBottom: 13,
                            }}
                          >
                            {item.date}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "rgba(255, 255, 255, 0.25)",
                              flex: 0.7,
                            }}
                          >
                            {item.user.full_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "100",
                              color: "rgba(255, 255, 255, 0.25)",
                              flex: 0.6,
                            }}
                          >
                            Places Available:{" "}
                            {item.total_seats - item.current_seats}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            )}
          /> */}
        </View>
      </ScrollView>
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
