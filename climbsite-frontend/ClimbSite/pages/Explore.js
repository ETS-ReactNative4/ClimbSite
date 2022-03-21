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
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Explore({ navigation }) {
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [crag, setCrag] = useState([
    {
      id: 2,
      name: "Beit merry",
      description: "it's bet mery",
      conditions: "hard boldery",
      gear: "60m rope",
      longitude: "448.484000",
      latitude: "841.286000",
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />

      <Text>Explore Page</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            {crag.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Crag");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      margin: 20,
                      backgroundColor: "#2F3F4A",
                      borderRadius: 15,
                      padding: 20,
                      width: 320,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ flex: 0.3 }}>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={require("../assets/betmerry.jpg")}
                      ></Image>
                    </View>
                    <View style={{ flex: 0.8, marginLeft: 20 }}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
        <Pressable
          style={[styles1.button, styles1.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles1.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles1 = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
