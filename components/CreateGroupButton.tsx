import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { baseIconSize, accentColor, doubleBaseUnit } from "../styles/styles";

const CreateGroupButton = () => {
  const findAutoMatch = async () => {
    try {
      // Set query parameters for matching
      const degree = 1; // Example degree, replace dynamically
      const course = 1; // Example course ID, replace dynamically
      const goalMinutes = 120; // Example goal minutes, replace dynamically

      const response = await axios.get(
        // we will need to change the ip, but for now it is running on cham's machine
        "http://192.168.169.2:3000/api/courses"
      );

      const matchedUser = response.data.match;
      if (matchedUser) {
        Alert.alert(`Matched with: ${matchedUser.name}`);
      } else {
        Alert.alert("No matching user found.");
      }
    } catch (error) {
      console.error("Error finding match:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={findAutoMatch}
      style={{ marginRight: doubleBaseUnit }}
    >
      <MaterialIcons
        name="person-add-alt"
        size={baseIconSize}
        color={accentColor}
      />
    </TouchableOpacity>
  );
};

export default CreateGroupButton;
