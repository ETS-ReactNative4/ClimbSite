import React, { useState, useContext, useEffect } from "react";
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
import axios from "axios";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Rankings({ navigation }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);

  const url = `${fetch_url}/api/climbers/rankings`;
  async function getInfo() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setRanking(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);

  const [rankings, setRanking] = useState();

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
        keyExtractor={(item, index) => index}
        data={rankings && rankings.result}
        renderItem={({ item, index }) => (
          <View style={styles.rankings}>
            <Text style={{ flex: 0.1, fontSize: 18 }}>{index + 1}</Text>
            {/* <View style={{ flex: 0.2, marginRight: 10 }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
                source={require("../assets/juan.jpeg")}
              ></Image>
            </View> */}

            <Text style={{ flex: 0.6, fontSize: 16 }}>{item.user}</Text>
            <Text
              style={{
                flex: 0.3,
                textAlign: "right",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item.ascents} ascents
            </Text>
          </View>
        )}
      />
    </View>
  );
}
