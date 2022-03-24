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

export default function Sectors() {
  const { height } = useWindowDimensions();
  const [route, setRoute] = useState([
    {
      id: 1,
      name: "test",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "6a",
    },
    {
      id: 2,
      name: "tesy2",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "5a",
    },
    {
      id: 3,
      name: "lol",
      sector: {
        id: 1,
        name: "sector 1",
        crag: {
          id: 2,
          name: "beit merry",
          description: "it's bet mery",
          conditions: "hard boldery",
          gear: "60m rope",
          longitude: "448.484000",
          latitude: "841.286000",
        },
      },
      grade: "5",
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <View style={{ marginVertical: 30 }}>
        {sector.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("Sectors");
              // }}
              >
                <View
                  style={{
                    marginVertical: 10,
                    backgroundColor: "#2F3F4A",
                    borderRadius: 15,
                    padding: 20,
                    width: 320,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <SelectDropdown
        dropdownStyle={{
          backgroundColor: "#2F3F4A",
          width: 320,
          alignSelf: "center",
        }}
        buttonStyle={{
          backgroundColor: "#2F3F4A",
          width: 320,
          alignSelf: "center",
        }}
        data={route}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
      />
    </View>
  );
}
