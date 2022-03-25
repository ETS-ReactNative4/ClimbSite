import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchEvent from "../pages/SearchEvent";
import Info from "../pages/Info";
import Sectors from "../pages/Sectors";
import CragEvents from "../pages/CragEvents";
import CragSectors from "../pages/CragSectors";

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        tabBarActiveTintColor: "#1B8B6A",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: "#2F3F4A",
          borderTopWidth: 0.75,
          borderTopColor: "rgba(255, 255, 255, 0.3)",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#1B8B6A",
        },
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: "Info" }}
      />
      <Tab.Screen
        name="Sectors"
        component={CragSectors}
        options={{ tabBarLabel: "Sectors" }}
      />
      <Tab.Screen
        name="CragEvents"
        component={CragEvents}
        options={{ tabBarLabel: "Events" }}
      />
    </Tab.Navigator>
  );
}
