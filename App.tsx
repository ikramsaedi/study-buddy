import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Leaderboard } from "./pages/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  accentColor,
  backgroundColor,
  navbarBackgroundColor,
} from "./styles/styles";
import { Profile } from "./pages/Profile";
import { Tracker } from "./pages/Tracker";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // Specifies default tab
        initialRouteName="Leaderboard"
        // This sets the bg color for all pages
        sceneContainerStyle={{ backgroundColor: backgroundColor }}
        screenOptions={{
          // TAB STYLING
          tabBarStyle: { backgroundColor: navbarBackgroundColor },
          tabBarActiveTintColor: accentColor,
          // HEADER STYLING
          headerStyle: {
            backgroundColor: navbarBackgroundColor,
          },
          headerTintColor: accentColor,
          headerTitle: "Study Buddy",
        }}
      >
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
