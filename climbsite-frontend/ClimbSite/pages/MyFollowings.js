import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileHeader";

export default function Followings({ navigation, route }) {
  const { item, otherParam } = route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ProfileHeader navigation={navigation} title={otherParam} />
      <Text style={{ marginLeft: 45, marginVertical: 20, fontSize: 20 }}>
        Your {otherParam}
      </Text>
      <FlatList
        key={(item) => item.id}
        data={item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Others Profile", item.id);
            }}
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
                  source={{ uri: item.profile_pic }}
                ></Image>
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "100" }}>
                  {item.email}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
