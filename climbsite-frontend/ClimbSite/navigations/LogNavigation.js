import { Text, View } from "react-native";
import React from "react";
import { styles } from "../styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogClimb from "../pages/LogClimb";
import LogEvent from "../pages/LogEvent";
import SearchEvent from "../pages/SearchEvent";
import { Provider } from "react-native-paper";
import Log from "../pages/Log";
import Profile from "../pages/Profile";
import Sectors from "../pages/Sectors";

const layout = createNativeStackNavigator();

export default function LogNavigation() {
  return (
    <Provider>
      <layout.Navigator
        initialRouteName="Log"
        screenOptions={{ headerShown: false }}
      >
        <layout.Screen name="Log" component={Log} />
        <layout.Screen name="LogClimb" component={LogClimb} />
        <layout.Screen name="LogEvent" component={LogEvent} />
        <layout.Screen name="SearchEvent" component={SearchEvent} />
        <layout.Screen name="Profile" component={Profile} />
        <layout.Screen name="Sectors" component={Sectors} />
      </layout.Navigator>
    </Provider>
  );
}
