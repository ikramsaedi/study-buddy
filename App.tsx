import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Leaderboard } from "./pages/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { backgroundColor, navbarBackgroundColor } from "./styles/styles";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: backgroundColor }}
        screenOptions={{
          tabBarStyle: { backgroundColor: navbarBackgroundColor },
          headerStyle: {
            backgroundColor: navbarBackgroundColor,
          },
          headerTitle: "Study Buddy",
        }}
      >
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is Ikram's profile</Text>;
};
