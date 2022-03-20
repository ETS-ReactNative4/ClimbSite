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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDown from "react-native-paper-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function LogEvent() {
  const { height } = useWindowDimensions();
  const [showDropDown, setShowDropDown] = useState(false);
  const [crag, setCrag] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Pick Date");

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
  const cragList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#122222",
        justifyContent: "center",
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
          <DropDown
            label={"Crag"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={crag}
            setValue={setCrag}
            list={cragList}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <DropDown
            label={"Sector"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={crag}
            setValue={setCrag}
            list={cragList}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={{
              width: 280,
              height: 55,
              backgroundColor: "rgb(18, 18, 18)",
              padding: 5,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 10,
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
    </View>
  );
}
