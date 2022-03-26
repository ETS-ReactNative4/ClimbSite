import Login from "./pages/Login";
import React from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import { Provider } from "react-native-paper";
import Navbar from "./navigations/Navbar";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer style={styles.app}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {SecureStore.getItemAsync("token") ? (
            <Stack.Screen name="Navbar" component={Navbar} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
