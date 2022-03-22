import Login from "./pages/Login";
import React from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { Provider } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer style={styles.app}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Navbar" component={Navbar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
