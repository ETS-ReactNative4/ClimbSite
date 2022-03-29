import React, { useState, useContext } from "react";
import { styles } from "../styles";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Easing,
  images,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import Rating from "react-native-rating";
import { AuthContext } from "../context/userContext";
import axios from "axios";

export default function AscentModal({ setModalVisible, modalVisible, item }) {
  const images = {
    starFilled: require("../assets/star_filled.png"),
    starUnfilled: require("../assets/star_unfilled.png"),
  };
  const [authState, setAuthState] = useContext(AuthContext);

  const [data, setData] = useState({
    route: item && item.route.id,
    tries: "",
    comment: "",
    rating: "",
  });

  const handleRouteId = (value) => {
    setData({
      ...data,
      route: value,
    });
  };

  const handleTries = (value) => {
    setData({
      ...data,
      tries: parseInt(value),
    });
  };
  const handleComment = (value) => {
    setData({
      ...data,
      comment: value,
    });
  };
  const handleRanking = (value) => {
    setData({
      ...data,
      rating: value,
    });
  };

  const handleSubmit = async () => {
    handleRouteId(item && item.route.id);

    const token = authState.token;
    const url = "http://192.168.1.54:7000/api/climbers/logascent";
    if (!(data.route && data.tries && data.comment && data.rating)) {
      // setError("empty");
    } else {
      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data_received = await response.data;
      } catch (error) {
        console.warn(error);
        // setError("wrong");
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={setModalVisible}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0,0.6)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "#2F3F4A",
            borderRadius: 15,
            padding: 20,
            width: 320,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#1B8B6A",
            }}
          >
            {item && item.route.name} ({item && item.route.grade})
          </Text>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Tries</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="How many Tries?"
              onChangeText={(value) => handleTries(value)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Comment</Text>
            <TextInput
              multiline
              style={styles.input}
              placeholder="Add Comment"
              onChangeText={(value) => handleComment(value)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Rating</Text>
            <View>
              <Rating
                onChange={(value) => handleRanking(value)}
                selectedStar={images.starFilled}
                unselectedStar={images.starUnfilled}
                config={{
                  easing: Easing.inOut(Easing.ease),
                  duration: 350,
                }}
                stagger={80}
                maxScale={1.4}
                starStyle={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: 80,
              height: 35,
              padding: 5,
              backgroundColor: "#1B8B6A",
              borderRadius: 5,
              textAlign: "center",
              marginVertical: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 17,
                flex: 1,
                fontWeight: "bold",
              }}
            >
              Ascent
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
