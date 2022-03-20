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

export default function LogEvent() {
  const { height } = useWindowDimensions();
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState("");
  const genderList = [
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
        <Text style={{ fontSize: 24, alignSelf: "center" }}>Log Event</Text>
        <Text style={styles.inputtext}>Crag: </Text>
        <DropDown
          label={"Gender"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={gender}
          setValue={setGender}
          list={genderList}
          dropDownStyle={{ color: "#2F3F4A" }}
        />
      </View>
    </View>
  );
}
