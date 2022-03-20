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
import Header from "../components/Header";

export default function Rankings({ navigation }) {
  const { height } = useWindowDimensions();
  const [rankings, setPost] = useState([
    {
      id: 1,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      asc: 5,
    },
    {
      id: 2,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      asc: 5,
    },
    {
      id: 3,
      user: {
        id: 8,
        full_name: "Cyril Asmar",
        email: "cyro@hotmail.com",
        dob: "1990-12-04",
      },
      asc: 5,
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
        Ascents Ranking
      </Text>
      <FlatList
        key={(item) => item.id}
        data={rankings}
        renderItem={({ item }) => (
          <View style={styles.rankings}>
            <Text style={{ flex: 0.1, fontSize: 18 }}>{item.id}</Text>
            <Text style={{ flex: 0.7, fontSize: 16 }}>
              {item.user.full_name}
            </Text>
            <Text
              style={{
                flex: 0.2,
                textAlign: "right",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item.asc} asc
            </Text>
          </View>
        )}
      />
    </View>
  );
}
