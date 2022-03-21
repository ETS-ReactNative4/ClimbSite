import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CragEvents from "../pages/CragEvents";
import Info from "../pages/Info";
import Sectors from "../pages/Sectors";

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Sectors"
        component={Sectors}
        options={{ tabBarLabel: "Updates" }}
      />
      <Tab.Screen
        name="CragEvents"
        component={CragEvents}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
