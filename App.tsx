import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Leaderboard } from "./pages/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./pages/Profile";
import { Tracker } from "./pages/Tracker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CreateGroupButton from "./components/CreateGroupButton";

import {
  accentColor,
  backgroundColor,
  navbarBackgroundColor,
  baseIconSize,
  doubleBaseUnit,
} from "./styles/styles";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Leaderboard"
        sceneContainerStyle={{ backgroundColor: backgroundColor }}
        screenOptions={{
          tabBarStyle: { backgroundColor: navbarBackgroundColor },
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
              {/* Pass the db instance to CreateGroupButton */}
              <CreateGroupButton />
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
