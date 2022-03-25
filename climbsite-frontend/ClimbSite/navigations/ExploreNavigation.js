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

import Sectors from "../pages/Sectors";
import Info from "../pages/Info";
import CragHeader from "../components/CragHeader";
import CragEvents from "../pages/CragEvents";

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
        <layout.Screen name="CragHeader" component={CragHeader} />
        {/* <layout.Screen name="Info" component={Info} />
        <layout.Screen name="Sectors" component={Sectors} />
        <layout.Screen name="CragEvent" component={CragEvents} /> */}
        <layout.Screen name="Profile" component={Profile} />
      </layout.Navigator>
    </Provider>
  );
}
