import React from "react";
import { styles } from "../styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-native-paper";
import Community from "../pages/Community";
import OthersProfile from "../pages/OthersProfile";

const layout = createNativeStackNavigator();

export default function CommunityNavigation() {
  return (
    <Provider>
      <layout.Navigator
        initialRouteName="Community"
        screenOptions={{ headerShown: false }}
      >
        <layout.Screen name="Community" component={Community} />
        <layout.Screen name="Others Profile" component={OthersProfile} />
      </layout.Navigator>
    </Provider>
  );
}
