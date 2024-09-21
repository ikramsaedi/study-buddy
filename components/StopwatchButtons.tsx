import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { ROOT_URL } from "../config";
import LocalState from "../LocalState";

type StopwatchButtonsProps = {
  running: boolean;
  pauseStopwatch: () => void;
  handleStop: () => void;
  handleStart: () => void;
  time: number; // time in seconds
};

export function StopwatchButtons({
  running,
  pauseStopwatch,
  handleStop,
  handleStart,
}: StopwatchButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      {running ? (
        <>
          {/* Stop Stopwatch */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={handleStop} // Use the stop handler
          >
            <MaterialCommunityIcons name="stop" color={"#D74A76"} size={50} />
          </TouchableOpacity>
          {/* Pause Stopwatch */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={pauseStopwatch}
          >
            <MaterialCommunityIcons name="pause" color={"#D74A76"} size={50} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Start Stopwatch */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={handleStart} // Use the start handler
          >
            <MaterialCommunityIcons name="play" color={"#D74A76"} size={50} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    marginTop: 30,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});
