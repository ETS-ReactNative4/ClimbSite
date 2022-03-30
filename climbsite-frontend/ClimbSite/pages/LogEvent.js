import React, { useState } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProfileHeader from "../components/ProfileHeader";
import ModalComponent from "../components/ModalComponent";
import Map from "../components/MapComponent";
import { AntDesign } from "@expo/vector-icons";

export default function LogEvent(navigation) {
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [date, setDate] = useState();
  const [selectedCrag, setSelectedCrag] = useState();
  const [selectedSector, setSelectedSector] = useState();

  const [crag, setCrag] = useState([
    {
      id: 2,
      name: "Beit merry",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: 33.890536626710244,
      latitude: 35.489303601542964,
    },
    {
      id: 3,
      name: "Tannourine",
      description: "it's Tannourine",
      conditions: "hard tannourine",
      gear: "80m rope",
      longitude: 34.890536626710244,
      latitude: 36.489303601542964,
    },
    {
      id: 4,
      name: "Tannourine",
      description: "it's Tannourine",
      conditions: "hard tannourine",
      gear: "80m rope",
      longitude: 35.890536626710244,
      latitude: 37.489303601542964,
    },
    {
      id: 5,
      name: "Chabrouh",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: 38.890536626710244,
      latitude: 35.489303601542964,
    },
  ]);

  const [sector, setSector] = useState([
    {
      id: 3,
      name: "sector3",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
    {
      id: 4,
      name: "sector4",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
    {
      id: 5,
      name: "sector1",
      crag: {
        id: 1,
        name: "tanourine",
        description: "it is in tanourine and has 5 routes",
        conditions: "very hard",
        gear: "90 m",
        longitude: "585.454000",
        latitude: "355.544000",
      },
    },
  ]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );

    hideDatePicker();
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
      <ScrollView style={{ marginBottom: 5, marginTop: 5 }}>
        <View
          style={{
            padding: 10,
            backgroundColor: "#2F3F4A",
            borderRadius: 15,
            width: 350,
            marginTop: 20,
          }}
        >
          {/* <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                width: 280,
                height: 50,
                padding: 5,
                backgroundColor: "#122222",
                borderRadius: 5,
                marginVertical: 10,
                elevation: 2,
                shadowColor: "gray",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  flex: 1,
                  marginTop: 7,
                }}
              >
                Pick Crag
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(true);
              }}
              style={{
                width: 280,
                height: 50,
                padding: 5,
                backgroundColor: "#122222",
                borderRadius: 5,
                marginVertical: 10,
                elevation: 2,
                shadowColor: "gray",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  flex: 1,
                  marginTop: 7,
                }}
              >
                Pick Sector
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ marginTop: -15 }}>
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
                padding: 20,
                width: 320,
                height: 65,
                alignSelf: "center",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.25)",
              }}
              rowStyle={{ borderBottomColor: "rgba(255, 255, 255, 0.25)" }}
              data={crag}
              onSelect={(selectedItem, index) => {
                // console.warn(selectedItem, index);
                setSelectedCrag(selectedItem);
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
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return item.name;
              }}
              // rowTextForSelection={(item, index) => {
              //   // text represented for each item in dropdown
              //   // if data array is an array of objects then return item.property to represent item in dropdown
              //   return item.name;
              // }}
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
                padding: 20,
                width: 320,
                height: 65,
                alignSelf: "center",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.25)",
              }}
              rowStyle={{ borderBottomColor: "rgba(255, 255, 255, 0.25)" }}
              data={sector}
              onSelect={(selectedItem, index) => {
                // console.warn(selectedItem, index);
                setSelectedSector(selectedItem);
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
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return item.name;
              }}
              // rowTextForSelection={(item, index) => {
              //   // text represented for each item in dropdown
              //   // if data array is an array of objects then return item.property to represent item in dropdown
              //   return item.name;
              // }}
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

          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              style={{
                width: 320,
                height: 65,
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
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10, alignSelf: "center", width: 320 }}>
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
              style={styles.input}
              placeholder="Write a description for more info..."
            />
          </View>
          <View style={{ marginVertical: 10, alignSelf: "center", width: 320 }}>
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
              style={styles.input}
              keyboardType="numeric"
              placeholder="Select number of places are available..."
            />
          </View>
          <Map />
        </View>
      </ScrollView>
      <ModalComponent
        item={crag}
        setModalVisible={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
      />
      <ModalComponent
        item={sector}
        setModalVisible={() => {
          setModalVisible1(!modalVisible1);
        }}
        modalVisible={modalVisible1}
      />
    </View>
  );
}
