import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Leaderboard } from "./pages/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./pages/Profile";
import { Tracker } from "./pages/Tracker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  accentColor,
  backgroundColor,
  navbarBackgroundColor,
  baseIconSize,
  doubleBaseUnit,
} from "./styles/styles";

// We use tab navigator for the bottom navbar
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // Loads you into Leaderboard page by default
        initialRouteName="Leaderboard"
        // Sets background colour
        sceneContainerStyle={{ backgroundColor: backgroundColor }}
        screenOptions={{
          tabBarStyle: { backgroundColor: navbarBackgroundColor },
          // Sets currently active tab colour
          tabBarActiveTintColor: accentColor,
          headerStyle: { backgroundColor: navbarBackgroundColor },
          headerTintColor: accentColor,
          headerTitle: "StudyBuddy",
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => alert("Notifications will go here")}
                style={{ marginRight: doubleBaseUnit }}
              >
                <MaterialIcons
                  name="notifications-none"
                  size={baseIconSize}
                  color={accentColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert("Add friends will go here")}
                style={{ marginRight: doubleBaseUnit }}
              >
                <MaterialIcons
                  name="person-add-alt"
                  size={baseIconSize}
                  color={accentColor}
                />
              </TouchableOpacity>
            </View>
          ),
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
