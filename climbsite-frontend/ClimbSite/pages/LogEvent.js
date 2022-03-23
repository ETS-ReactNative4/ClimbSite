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

export default function LogEvent() {
  const { height } = useWindowDimensions();
  const [showDropDown, setShowDropDown] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <View
        style={{
          padding: 20,
          backgroundColor: "#2F3F4A",
          borderRadius: 15,
          width: 320,
        }}
      >
        <Text style={{ fontSize: 24, alignSelf: "center", margin: 10 }}>
          Log Event
        </Text>

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
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Places Available"
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.7)",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#2F3F4A",
              borderRadius: 15,
              padding: 20,
              width: 320,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FlatList
              key={(item) => item.id}
              data={crag}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={{ height: 50 }}>
                    <Text>{item.name} </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
