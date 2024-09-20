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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
        <Tab.Screen
          name="Tracker"
          component={Tracker}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="clock-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="leaderboard" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
