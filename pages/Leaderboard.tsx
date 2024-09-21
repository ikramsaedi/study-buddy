import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import { doubleBaseUnit } from "../styles/styles";
import { LeaderboardList } from "../components/LeaderboardList";
import { StatCard } from "../components/StatCard";
import { FindBuddyButton } from "../components/FindStudyBuddyButton";
import axios from "axios"; // Import axios to make the API call
import LocalState from "../LocalState";
import { ROOT_URL } from "../config";

export function Leaderboard() {
  const localState = LocalState.getInstance();
  const [matchedUser, setMatchedUser] = useState("");
  const [isInMatchedGroup, setIsInMatchedGroup] = useState(false);

  // Check if the user is in a matched group
  useEffect(() => {
    const checkIfMatched = async () => {
      try {
        // Get the current datetime in ISO format
        const currentDatetime = new Date().toISOString();
        
        // Make the API call with the userId and the current datetime
        const response = await axios.get(`${ROOT_URL}/api/isUserInMatchedGroup`, {
          params: {
            userId: localState.getUserDataId(), // Replace with actual user ID
            currentDatetime: currentDatetime // Pass the current datetime
          },
        });
        
        // Update state based on whether the user is in a matched group
        setIsInMatchedGroup(response.data.isInMatchedGroup);
      } catch (error) {
        console.error("Error checking matched group:", error);
      }
  };

  checkIfMatched();
  }, []);


  const handleMatchFound = (matchedUser: string) => {
    Alert.alert(`Matched with: ${matchedUser}`);
    setMatchedUser(matchedUser);
  };

  console.log("isInMatchedGroup", isInMatchedGroup);

  return (
    <ScrollView>
      {/* Stat Card */}
      <View style={{ padding: doubleBaseUnit }}>
        <StatCard />
      </View>

      {/* Find Buddy Button - Show only if not in a matched group */}
      {!isInMatchedGroup && (
        <View style={{ padding: doubleBaseUnit }}>
          <FindBuddyButton onMatchFound={handleMatchFound} />
        </View>
      )}

      {/* Leaderboard List */}
      <LeaderboardList />
    </ScrollView>
  );
}
