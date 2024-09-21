import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { baseIconSize, accentColor, doubleBaseUnit } from "../styles/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ROOT_URL } from "../config";

const CreateGroupButton = () => {
  const findCourses = async () => {
    try {
      const response = await axios.get(
        // we will need to change the ip, but for now it is running on cham's machine
        `${ROOT_URL}/api/courses`
      );
      console.log("Courses:", response.data.courses);
      Alert.alert("Courses loaded!");
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={findCourses}
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
