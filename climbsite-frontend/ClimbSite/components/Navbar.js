import { styles } from "../styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

export default function Navbar({ navigation }) {
  return (
    <Tab.Navigator firstRoute={Home} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
