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
import Explore from "../pages/Explore";
import Crag from "../pages/Crag";

const layout = createNativeStackNavigator();

export default function ExploreNavigation() {
  return (
    <Provider>
      <layout.Navigator
        initialRouteName="Explore"
        screenOptions={{ headerShown: false }}
      >
        <layout.Screen name="Explore" component={Explore} />
        <layout.Screen name="Crag" component={Crag} />
      </layout.Navigator>
    </Provider>
  );
}
