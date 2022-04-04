import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { format } from "date-fns";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProfileHeader from "../components/ProfileHeader";
import Map from "../components/MapComponent";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function LogEvent({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();
  const [selectedCrag, setSelectedCrag] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [location, setLocation] = useState();
  const [crag, setCrag] = useState("");
  const [authState, setAuthState] = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  const [data, setData] = useState({
    crag: "",
    sector: "",
    description: "",
    date: "",
    total_seats: "",
    longitude: "",
    latitude: "",
  });
  const url = `${fetch_url}/api/crags/`;
  async function getInfo() {
    try {
      const response = await axios.get(url);
      const data_received = await response.data;
      setCrag(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function getSectors(id) {
    const url_sector = `${fetch_url}/api/crags/sectors?crag_id=${id}`;
    try {
      const response = await axios.get(url_sector);
      const data_received = await response.data;
      setSector(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  const handleCrag = (value) => {
    setData({
      ...data,
      crag: value,
    });
  };

  const handleSector = (value) => {
    setData({
      ...data,
      sector: value,
    });
  };
  const handleDescription = (value) => {
    setData({
      ...data,
      description: value,
    });
  };
  const handlePlaces = (value) => {
    setData({
      ...data,
      total_seats: value,
    });
  };

  const [sector, setSector] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value) => {
    const formattedDate = format(value, "yyyy-MM-dd");
    setDate(formattedDate);

    hideDatePicker();
    setData({
      ...data,
      date: formattedDate,
    });
  };

  const handleLocation = (value) => {
    setData({
      ...data,
      longitude: value.longitude,
      latitude: value.latitude,
    });
    setLocation(value);
  };

  const handleSubmit = async () => {
    const token = authState.token;
    const url = `${fetch_url}/api/events/log_event`;
    if (
      !(
        data.crag &&
        data.sector &&
        data.date &&
        data.description &&
        data.latitude &&
        data.longitude &&
        data.total_seats
      )
    ) {
      setStatus("empty");
    } else {
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data_received = await response.data;

        setStatus("success");
      } catch (error) {
        setStatus("fail");
        console.warn(error);
        // setError("wrong");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#122222",
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title="Log Event" />
      <ScrollView style={{ marginBottom: 5, marginTop: 10 }}>
        <View
          style={{
            padding: 10,
            backgroundColor: "#2F3F4A",
            borderRadius: 15,
            width: 350,
            marginTop: 5,
          }}
        >
          {status == "success" ? (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AntDesign name="checkcircle" size={20} color="#1B8B6A" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>Event Created</Text>
            </View>
          ) : status == "fail" ? (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <AntDesign name="closecircle" size={20} color="#A05B5B" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>
                You already created an event in this date
              </Text>
            </View>
          ) : status == "empty" ? (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="closecircle" size={20} color="#A05B5B" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>Empty Field</Text>
            </View>
          ) : (
            <View></View>
          )}

          <View style={{ marginTop: -15 }}>
            <SelectDropdown
              data={crag && crag}
              renderDropdownIcon={() => {
                return (
                  <View style={{ marginRight: 15 }}>
                    <AntDesign name="down" size={24} color="black" />
                  </View>
                );
              }}
              dropdownIconPosition="right"
              dropdownStyle={{
                backgroundColor: "#2F3F4A",
                width: 320,
                alignSelf: "center",
                borderRadius: 15,
                marginTop: -25,
              }}
              buttonStyle={{
                backgroundColor: "#2F3F4A",
                borderRadius: 15,
                padding: 10,
                width: 320,
                height: 60,
                alignSelf: "center",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.25)",
              }}
              rowStyle={{ borderBottomColor: "rgba(255, 255, 255, 0.25)" }}
              onSelect={(selectedItem, index) => {
                // console.warn(selectedItem, index);
                setSelectedCrag(selectedItem);
                getSectors(selectedItem.id);
                handleCrag(selectedItem.id);
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <Pressable>
                    <Text
                      style={{
                        textAlign: "left",

                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Select Crag:
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",

                        fontSize: 12,
                      }}
                    >
                      {selectedItem && selectedItem.name}
                    </Text>
                  </Pressable>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return item.name;
              }}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        marginLeft: 20,
                        flex: 1,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View>
            {selectedCrag ? (
              <SelectDropdown
                renderDropdownIcon={() => {
                  return (
                    <View style={{ marginRight: 15 }}>
                      <AntDesign name="down" size={24} color="black" />
                    </View>
                  );
                }}
                dropdownIconPosition="right"
                dropdownStyle={{
                  backgroundColor: "#2F3F4A",
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 15,
                  marginTop: -25,
                }}
                buttonStyle={{
                  backgroundColor: "#2F3F4A",
                  borderRadius: 15,
                  padding: 10,
                  width: 320,
                  height: 60,
                  alignSelf: "center",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255, 255, 255, 0.25)",
                }}
                rowStyle={{ borderBottomColor: "rgba(255, 255, 255, 0.25)" }}
                data={sector && sector}
                onSelect={(selectedItem, index) => {
                  // console.warn(selectedItem, index);
                  setSelectedSector(selectedItem);
                  handleSector(selectedItem.id);
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <Pressable>
                      <Text
                        style={{
                          textAlign: "left",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        Select Sector:
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",

                          fontSize: 12,
                        }}
                      >
                        {selectedItem && selectedItem.name}
                      </Text>
                    </Pressable>
                  );
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return item.name;
                }}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          marginLeft: 20,
                          flex: 1,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                }}
              />
            ) : (
              <SelectDropdown
                renderDropdownIcon={() => {
                  return (
                    <View style={{ marginRight: 15 }}>
                      <AntDesign
                        name="down"
                        size={24}
                        color="rgba(255, 255, 255, 0.25)"
                      />
                    </View>
                  );
                }}
                dropdownIconPosition="right"
                buttonStyle={{
                  backgroundColor: "#2F3F4A",
                  borderRadius: 15,
                  padding: 20,
                  width: 320,
                  height: 60,
                  alignSelf: "center",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255, 255, 255, 0.25)",
                }}
                data={sector}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        console.warn("select a crag first");
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          color: "rgba(255, 255, 255, 0.25)",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        Select Sector:
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",

                          fontSize: 12,
                        }}
                      >
                        {selectedItem && selectedItem.name}
                      </Text>
                    </Pressable>
                  );
                }}
                disabled
              />
            )}
          </View>

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{
                width: 320,
                height: 60,
                backgroundColor: "#2F3F4A",
                padding: 10,
                borderRadius: 15,
                alignSelf: "center",
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.25)",
                flexDirection: "row",
              }}
              onPress={showDatePicker}
            >
              <View style={{ flex: 0.9 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Select Date:
                </Text>
                <Text
                  style={{
                    textAlign: "left",

                    fontSize: 12,
                  }}
                >
                  {date}
                </Text>
              </View>
              <AntDesign
                style={{ flex: 0.1, marginRight: 7 }}
                name="calendar"
                size={24}
                color="black"
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{
                width: 320,
                height: 60,
                backgroundColor: "#2F3F4A",
                padding: 10,
                borderRadius: 15,
                alignSelf: "center",
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.25)",
                flexDirection: "row",
              }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View style={{ flex: 0.9 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Select Departure Location:
                </Text>
                <Text
                  style={{
                    textAlign: "left",

                    fontSize: 12,
                  }}
                >
                  {location && location.latitude}{" "}
                  {location && location.longitude}
                </Text>
              </View>
              <MaterialIcons
                style={{ flex: 0.1, marginRight: 7 }}
                name="add-location-alt"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, alignSelf: "center", width: 320 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                width: 300,
                alignSelf: "center",
              }}
            >
              Description:
            </Text>
            <TextInput
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#777",
                padding: 10,
                margin: 10,
                width: 300,
                height: 60,
              }}
              placeholder="Write a description for more info..."
              onChangeText={(value) => handleDescription(value)}
            />
          </View>
          <View style={{ marginTop: 10, alignSelf: "center", width: 320 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                width: 300,
                alignSelf: "center",
              }}
            >
              Places Available:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#777",
                padding: 10,
                margin: 10,
                width: 300,
                height: 60,
              }}
              keyboardType="numeric"
              placeholder="Select number of places available..."
              onChangeText={(value) => handlePlaces(value)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            style={styles.loginButton}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                flex: 1,
                fontWeight: "bold",
              }}
            >
              Log Event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Map
        setCoordinates={handleLocation}
        setModalVisible={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
      />
    </View>
  );
}
