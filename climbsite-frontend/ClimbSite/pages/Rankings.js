import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, useWindowDimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import axios from "axios";
import { AuthContext } from "../context/userContext";
import fetch_url from "../host";

export default function Rankings({ navigation }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);

  async function getRankings() {
    const token = authState.token;
    const rankings_url = `${fetch_url}/api/climbers/rankings`;

    try {
      const response = await axios.get(rankings_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setRanking(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getRankings();
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
