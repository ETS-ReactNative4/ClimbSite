import Login from "./pages/Login";
import React, { useState } from "react";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import { Provider } from "react-native-paper";
import Navbar from "./navigations/Navbar";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLogged, setIsLogged] = useState(null);
  const auth = async () => {
    const access = await SecureStore.getItemAsync("token");

    const token = JSON.parse(access);
    if (token === null) {
      setIsLogged(null);
    } else {
      setIsLogged(token);
    }
  };
  auth();
  console.warn(isLogged);
  return (
    <Provider>
      <NavigationContainer style={styles.app}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {isLogged != null ? (
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
