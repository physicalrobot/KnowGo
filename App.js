import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./Stylesheet";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

const Stack = createStackNavigator();

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    Quicksand: require("./assets/fonts/Quicksand-VariableFont_wght.ttf"), // Ensure correct path
    QuicksandBold: require("./assets/fonts/Quicksand-Bold.ttf"), // Ensure correct path

  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await loadFonts(); // Load fonts or other assets
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync(); // Hide the splash screen when ready
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null; // Render nothing until the app is ready
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
        >
          {(props) => (
            <SignIn {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
        >
          {(props) => (
            <SignUp {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
