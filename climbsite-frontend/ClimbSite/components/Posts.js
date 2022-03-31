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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";

export default function Posts({ navigation, data, image }) {
  const { height } = useWindowDimensions();

  const [star, setStar] = useState(
    <AntDesign name="star" size={15} color="black" />
  );

  return (
    <FlatList
      style={{ marginTop: 10 }}
      key={(item) => item.id}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {image}
            <View style={{ flex: 0.7 }}>
              <Text style={{ fontSize: 18, color: "#1B8B6A" }}>
                {item.route.name} {item.route.grade}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "100", color: "white" }}>
                {item.route.sector.crag.name}
              </Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {item.user.full_name}
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={{ color: "white" }}>{item.date} </Text>
              <View
                style={{
                  marginVertical: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {star}
                <Text style={{ marginLeft: 3 }}>{item.rating}/5</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "100", color: "white" }}>
                Tries: {item.tries}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "rgba(255, 255, 255, 0.25)",
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />
          <View>
            <Text style={{ fontSize: 14, lineHeight: 18 }}>{item.comment}</Text>
          </View>
        </View>
      )}
    />
  );
}
