import React, { useState, useContext, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/userContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import fetch_url from "../host";

export default function Settings({ navigation }) {
  const { height } = useWindowDimensions();
  const [authState, setAuthState] = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const url = `${fetch_url}/api/climbers/user_info`;

  const [profile, setProfile] = useState();
  async function getInfo() {
    const token = authState.token;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setProfile(data_received);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    navigation.addListener("focus", () => {
      getInfo();
    });
  }, []);
  // const [image, setImage] = useState(null);

  // async function handleSubmit() {
  //   const token = authState.token;
  //   const url = `http://192.168.1.54:7000/api/climbers/image_upload`;
  //   const profile_pic = {
  //     image: image,
  //   };
  //   try {
  //     const response = await axios.post(url, profile_pic, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data_received = await response.data;
  //     console.log(data_received);
  //   } catch (error) {
  //     console.log(error);
  //     // setError("already exist");
  //   }
  // }
  // const options = {
  //   title: "Choose an Image",
  //   base64: true,
  // };
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     base64: true,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     let imageUri = `data:image/jpg;base64,${result.base64}`;
  //     // setImage(
  //     //   await FileSystem.readAsStringAsync(result.uri, {
  //     //     encoding: "base64",
  //     //   })
  //     // );
  //     setImage(imageUri);
  //     // console.log(result.base64);
  //     console.log(image);
  //   }
  // };

  const [data, setData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });

  const handleold = (value) => {
    setData({
      ...data,
      old_password: value,
    });
  };
  const handleNew = (value) => {
    setData({
      ...data,
      password: value,
    });
  };
  const handleConfirm = (value) => {
    setData({
      ...data,
      password2: value,
    });
  };
  const handleSubmit = async () => {
    const token = authState.token;
    const url = `http://192.168.1.54:7000/change_password/${profile[0].id}/`;

    if (!(data.old_password && data.password)) {
      // setError("empty");
    } else {
      try {
        const response = await axios.put(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data_received = await response.data;
        Alert.alert("Changed password successfully");
        setModalVisible(false);
      } catch (error) {
        console.warn(error);
        // setError("wrong");
      }
    }
  };

  const [info, setInfo] = useState({
    email: profile && profile[0].email,
    full_name: profile && profile[0].full_name,
  });

  const handleEmail = (value) => {
    setInfo({
      ...info,
      email: value,
    });
  };
  const handleName = (value) => {
    setInfo({
      ...info,
      full_name: value,
    });
  };

  const handleEdit = async () => {
    const token = authState.token;

    const url = `http://192.168.1.54:7000/update_profile/${profile[0].id}/`;

    if (!(info.email && info.full_name)) {
      // setError("empty");
    } else {
      try {
        const response = await axios.put(url, info, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data_received = await response.data;

        Alert.alert("Changed Info successfully");
      } catch (error) {
        console.warn(error);
        // setError("wrong");
      }
    }
  };

  const handleLogout = async () => {
    setAuthState({
      signedIn: false,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      {/* <Text>Settings</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
      {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      {/* </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 17,
            flex: 1,
            fontWeight: "bold",
          }}
        >
          Upload
        </Text>
      </TouchableOpacity> */}
      <View
        style={{
          backgroundColor: "#2F3F4A",
          width: 350,
          borderRadius: 15,
          alignSelf: "center",
          padding: 15,
          marginTop: -10,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
            color: "white",
            alignSelf: "center",
          }}
        >
          Edit Profile
        </Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="New Email..."
            onChangeText={(value) => handleEmail(value)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="New Name..."
            onChangeText={(value) => handleName(value)}
          />
        </View>
        <View style={{ flexDirection: "row", width: 350 }}>
          <TouchableOpacity
            onPress={() => {
              handleEdit();
            }}
            style={{
              width: 90,
              height: 35,
              padding: 5,
              backgroundColor: "#1B8B6A",
              borderRadius: 5,
              textAlign: "center",
              marginVertical: 10,
              alignSelf: "flex-end",
              marginRight: 60,
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
              Edit Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              width: 160,
              height: 35,
              padding: 5,

              borderRadius: 5,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 15,
                flex: 1,
                color: "#1B8B6A",
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ justifyContent: "flex-end", flex: 1, marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            width: 90,
            height: 35,
            padding: 5,
            backgroundColor: "#A05B5B",
            borderRadius: 5,
            textAlign: "center",
            marginVertical: 10,
            alignSelf: "center",
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
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
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                color: "white",
                alignSelf: "center",
              }}
            >
              Change Password
            </Text>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16 }}>Old Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Old Password..."
                secureTextEntry={true}
                onChangeText={(value) => handleold(value)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16 }}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password..."
                secureTextEntry={true}
                onChangeText={(value) => handleNew(value)}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16 }}>Confirm Password</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password..."
                  secureTextEntry={true}
                  onChangeText={(value) => handleConfirm(value)}
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
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
