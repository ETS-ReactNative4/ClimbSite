import React, { useState } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function EventContainer({ data }) {
  return (
    <FlatList
      key={(item) => item.id}
      data={data}
      renderItem={({ item }) => (
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
              }}
            >
              <Text style={{ fontSize: 20, color: "#1B8B6A", flex: 0.7 }}>
                {item.crag.name}
              </Text>
              <Text style={{ color: "white", flex: 0.3 }}>{item.date} </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16, color: "white", flex: 0.7 }}>
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
                Places Available: {item.current_seats}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}
