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
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";

export default function SectorContainer({ data, rowData }) {
  const { height } = useWindowDimensions();

  return (
    <View>
      {data.map((item) => {
        return (
          <View
            key={item.id}
            style={{
              alignItems: "center",
            }}
          >
            <SelectDropdown
              defaultButtonText={item.name}
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
              }}
              buttonTextStyle={{
                textAlign: "left",
                marginLeft: 20,
                fontWeight: "bold",
                fontSize: 20,
              }}
              rowStyle={{ borderBottomColor: "rgba(255, 255, 255, 0.25)" }}
              data={rowData}
              onSelect={(selectedItem, index) => {
                console.warn(selectedItem, index);
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
                    <Text style={{ color: "white" }}>{item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
        );
      })}
    </View>
  );
}
