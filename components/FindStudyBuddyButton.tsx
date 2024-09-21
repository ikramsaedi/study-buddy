import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { doubleBaseUnit, bodyFontSize, accentColor } from "../styles/styles";
import { ROOT_URL } from "../config";

type FindBuddyButtonProps = {
  onMatchFound: (matchedUser: string) => void;
};

export function FindBuddyButton({ onMatchFound }: FindBuddyButtonProps) {
  const [isInAutoMatchGroup, setIsInAutoMatchGroup] = useState(false);

  useEffect(() => {
    const checkAutoMatchGroup = () => {
      const userInGroup = false; // Replace with actual logic to check
      setIsInAutoMatchGroup(userInGroup);
    };

    checkAutoMatchGroup();
  }, []);

  const findStudyBuddy = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/api/match`, {
        params: {
          userId: 1, // Replace with the actual user ID dynamically if needed
        },
      });

      const matchedUser = response.data.match
        ? response.data.match.name
        : response.data.message;
      onMatchFound(matchedUser);
    } catch (error) {
      console.error("Error finding match:", error);
    }
  };

  return (
    <View>
      {!isInAutoMatchGroup && (
        <TouchableOpacity onPress={findStudyBuddy} style={styles.button}>
          <Text style={styles.buttonText}>Find Study Buddy</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: doubleBaseUnit,
  },
  button: {
    backgroundColor: accentColor,
    padding: doubleBaseUnit,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: bodyFontSize,
    fontWeight: "bold",
  },
});
