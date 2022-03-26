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
import Posts from "../components/Posts";

export default function Home({ navigation }) {
  const { height } = useWindowDimensions();
  const [posts, setPost] = useState([
    {
      id: 1,
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
    {
      id: 2,
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
    {
      id: 4,
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
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />
      <View style={{ flex: 1 }}>
        <Posts
          navigation={navigation}
          data={posts}
          image={
            <View style={{ flex: 0.23 }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginRight: 10,
                }}
                source={require("../assets/juan.jpeg")}
              ></Image>
            </View>
          }
        />
      </View>
    </View>
  );
}
