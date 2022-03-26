import Login from "./pages/Login";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import Register from "./pages/Register";
import { Provider } from "react-native-paper";
import Navbar from "./navigations/Navbar";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "./context/userContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  // const [isLogged, setIsLogged] = useState(false);
  // const auth = async () => {
  //   const access = await SecureStore.getItemAsync("token");

  //   const token = JSON.parse(access);
  //   if (token === null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  const [authState, setAuthState] = useState({
    signedIn: false,
  });

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      <Provider>
        <NavigationContainer style={styles.app}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            {authState.signedIn == true ? (
              <Stack.Screen name="Navbar" component={Navbar} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )}
            {/* {null === null ? (
            <Stack.Screen name="Navbar" component={Navbar} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}
