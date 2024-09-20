import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/styles";

export function Leaderboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Leaderboard</Text>
    </ScrollView>
  );
}
