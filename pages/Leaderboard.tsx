import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { doubleBaseUnit } from "../styles/styles";
import { LeaderboardList } from "../components/LeaderboardList";
import { StatCard } from "../components/StatCard";
import { FindBuddyButton } from "../components/FindStudyBuddyButton";

export function Leaderboard() {
  const [matchedUser, setMatchedUser] = useState("");

  const handleMatchFound = (matchedUser: string) => {
    Alert.alert(`Matched with: ${matchedUser}`);
    setMatchedUser(matchedUser);
  };

  return (
    <ScrollView>
      {/* Stat Card */}
      <View style={{ padding: doubleBaseUnit }}>
        <StatCard />
      </View>

      {/* Find Buddy Button */}
      <View style={{ padding: doubleBaseUnit }}>
        <FindBuddyButton onMatchFound={handleMatchFound} />
      </View>

      {/* Leaderboard List */}
      <LeaderboardList />
    </ScrollView>
  );
}
