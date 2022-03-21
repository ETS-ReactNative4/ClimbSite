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
            <View
              style={{
                margin: 20,
                backgroundColor: "#2F3F4A",
                borderRadius: 15,
                padding: 35,
                width: 320,
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={require("../assets/betmerry.jpg")}
                ></Image>
              </View>
              <Text style={styles1.modalText}>Hello World!</Text>
            </View>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
