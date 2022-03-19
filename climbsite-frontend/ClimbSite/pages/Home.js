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
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";

export default function Home({ navigation }) {
  const { height } = useWindowDimensions();
  const [posts, setPost] = useState([
    {
      id: 3,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      route: {
        id: 3,
        name: "For Charlotte",
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
        grade: "5c",
      },
      tries: 5,
      rating: 7,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      date: "2022-03-14",
    },
  ]);

  const [star, setStar] = useState(
    <AntDesign name="star" size={15} color="black" />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#1B8B6A" }}>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <View style={{ flex: 1 }}>
        <FlatList
          key={(item) => item.id}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: 130 }}>
                  <Text style={{ fontSize: 18, color: "#1B8B6A" }}>
                    {item.route.name} {item.route.grade}
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "100", color: "white" }}
                  >
                    {item.route.sector.crag.name}
                  </Text>
                  <Text style={{ fontSize: 16, color: "white" }}>
                    {item.user.full_name}
                  </Text>
                </View>
                <View style={{ marginLeft: 80 }}>
                  <Text>{item.date} </Text>
                  <View style={{ marginVertical: 8 }}>{star}</View>
                  <Text
                    style={{ fontSize: 14, fontWeight: "100", color: "white" }}
                  >
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
                <Text style={{ fontSize: 14, lineHeight: 18 }}>
                  {item.comment}{" "}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
