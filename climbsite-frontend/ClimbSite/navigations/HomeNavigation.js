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
import Home from "../pages/Home";
import Login from "../pages/Login";
import Followings from "../pages/MyFollowings";
import OthersProfile from "../pages/OthersProfile";

const layout = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Provider>
      <layout.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <layout.Screen name="Home" component={Home} />
        <layout.Screen name="Profile" component={Profile} />
        <layout.Screen name="Others Profile" component={OthersProfile} />
        <layout.Screen name="Followings" component={Followings} />
      </layout.Navigator>
    </Provider>
  );
}
