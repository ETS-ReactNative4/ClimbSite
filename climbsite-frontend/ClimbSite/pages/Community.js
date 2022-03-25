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
import Header from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Community({ navigation }) {
  const { height } = useWindowDimensions();
  const [profile, setProfile] = useState([
    {
      id: 8,
      full_name: "Cyril Asmar",
      email: "cyro@hotmail.com",
      country: "Lebanese",
      asc: "34",
    },
    {
      id: 2,
      full_name: "Cyril Asmar",
      email: "cyro@hotmail.com",
      country: "Lebanese",
      asc: "34",
    },
    {
      id: 1,
      full_name: "Cyril Asmar",
      email: "cyro@hotmail.com",
      country: "Lebanese",
      asc: "34",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
        Climbers you may know...
      </Text>
      <FlatList
        key={(item) => item.id}
        data={profile}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              padding: 20,
              marginHorizontal: 30,
              backgroundColor: "#2F3F4A",
              borderRadius: 15,
              alignSelf: "center",
              display: "flex",
              width: 350,
              margin: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={{ flex: 0.2, marginRight: 20 }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                  source={require("../assets/juan.jpeg")}
                ></Image>
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "100" }}>
                  {item.country}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "100" }}>
                  {item.asc} Ascents
                </Text>
              </View>
            </View>
            <Feather
              style={{ flex: 0.1, alignSelf: "center" }}
              name="user-plus"
              size={24}
              color="black"
            />
          </View>
        )}
      />
    </View>
  );
}
