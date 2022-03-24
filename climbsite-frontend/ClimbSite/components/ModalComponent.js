import React, { useState } from "react";
import { styles } from "../styles";
import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ModalComponent({
  item,
  setModalVisible,
  modalVisible,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={setModalVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0,0.7)",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 60,
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
          <FlatList
            key={(item) => item.id}
            data={item}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{item.name} </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "rgba(255, 255, 255, 0.25)",
                    borderBottomWidth: 1,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
