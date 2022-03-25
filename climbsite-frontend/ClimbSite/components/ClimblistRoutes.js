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
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ClimblistRoutes({ data }) {
  const { height } = useWindowDimensions();

  return (
    <FlatList
      style={{ marginTop: -20 }}
      key={(item) => item.id}
      data={data}
      renderItem={({ item }) => (
        <View
          style={{
            width: 350,
            backgroundColor: "#2F3F4A",
            alignSelf: "center",
            borderRadius: 15,
            padding: 20,
            marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, flex: 0.9, marginLeft: 10 }}>
            {item.name}
          </Text>
          <AntDesign
            style={{ flex: 0.1 }}
            name="check"
            size={24}
            color="black"
          />
        </View>
      )}
    />
  );
}
