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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProfileHeader from "../components/ProfileHeader";
import ModalComponent from "../components/ModalComponent";

export default function LogEvent(navigation) {
  const { height } = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [date, setDate] = useState("Pick Date");

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
      <View
        style={{
          padding: 20,
          backgroundColor: "#2F3F4A",
          borderRadius: 15,
          width: 320,
          marginTop: 20,
        }}
      >
        <View style={{ marginVertical: 10 }}>
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
        </View>
        <View style={{ marginVertical: 10 }}>
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
        </View>

        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={{
              width: 280,
              height: 50,
              backgroundColor: "#122222",
              padding: 5,
              borderRadius: 5,
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 10,
              elevation: 2,
              shadowColor: "gray",
            }}
            onPress={showDatePicker}
          >
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                color: "white",
                fontSize: 16,
              }}
            >
              {date}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <TextInput multiline style={styles.input} placeholder="Description" />
        </View>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Places Available"
          />
        </View>
      </View>
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
