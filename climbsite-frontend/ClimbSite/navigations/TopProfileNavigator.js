import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchEvent from "../pages/SearchEvent";
import Info from "../pages/Info";
import Sectors from "../pages/Sectors";
import CragEvents from "../pages/CragEvents";
import CragSectors from "../pages/CragSectors";
import ProfilePosts from "../pages/ProfilePosts";
import Climblist from "../pages/Climblist";
import Settings from "../pages/Settings";

const Tab = createMaterialTopTabNavigator();

export default function TopTabProfile() {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        tabBarActiveTintColor: "#1B8B6A",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: "#2F3F4A",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.5)",
          width: 350,
          alignSelf: "center",
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          marginTop: -0.7,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#1B8B6A",
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={ProfilePosts}
        options={{ tabBarLabel: "Posts" }}
      />
      <Tab.Screen
        name="Climblist"
        component={Climblist}
        options={{ tabBarLabel: "Climblist" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings" }}
      />
    </Tab.Navigator>
  );
}
