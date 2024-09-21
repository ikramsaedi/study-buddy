import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { baseIconSize, accentColor, doubleBaseUnit } from "../styles/styles";
import * as SQLite from "expo-sqlite";

interface CreateGroupButtonProps {
  db: SQLite.SQLiteDatabase | null;
}

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({ db }) => {
  const findAutoMatch = async () => {
    console.log("Finding match...");
    if (db) {
      try {
        const result = await db.getFirstAsync("SELECT * FROM user LIMIT 1");
        console.log(result.id);
        if (result) {
          console.log("Matched");
        } else {
          console.log("No matching user found.");
        }
      } catch (error) {
        console.log("Error finding match: ", error);
      }
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
