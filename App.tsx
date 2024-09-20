import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Leaderboard } from "./components/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "#E0C7E9" }}
        screenOptions={{}}
      >
        <Tab.Screen
          name="Home"
          component={Leaderboard}
          options={{ title: "Welcome" }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is Ikram's profile</Text>;
};
