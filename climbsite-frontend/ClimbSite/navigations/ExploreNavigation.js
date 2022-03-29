import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-native-paper";
import Profile from "../pages/Profile";
import Explore from "../pages/Explore";
import Crag from "../pages/Crag";

import { CragContext } from "../context/cragContext";

const layout = createNativeStackNavigator();

export default function ExploreNavigation() {
  const [cragState, setCragState] = useState({
    id: "",
    name: "",
    description: "",
    conditions: "",
    gear: "",
    longitude: "",
    latitude: "",
  });
  return (
    <Provider>
      <CragContext.Provider value={[cragState, setCragState]}>
        <layout.Navigator
          initialRouteName="Explore"
          screenOptions={{ headerShown: false }}
        >
          <layout.Screen name="Explore" component={Explore} />
          <layout.Screen name="Crag" component={Crag} />
          <layout.Screen name="Profile" component={Profile} />
        </layout.Navigator>
      </CragContext.Provider>
    </Provider>
  );
}
