import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { ROOT_URL } from "../config";
import LocalState from "../LocalState";

type StopwatchButtonsProps = {
  running: boolean;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  startStopwatch: () => void;
  time: number; // time in seconds
};

// Function to convert seconds to minutes
const calculateDurationMinutes = (timeInSeconds: number): number => {
  return Math.round(timeInSeconds / 60); // Convert to minutes and round off
};

// Function to send study session data to the backend
const addStudySession = async (
  durationMinutes: number,
  startTime: Date,
  endTime: Date
) => {
  const localState = LocalState.getInstance();

  try {
    await axios.post(`${ROOT_URL}/api/addStudySession`, {
      userId: localState.getUserDataId(),
      durationMinutes: durationMinutes,
      start: startTime.toISOString(), // Send as ISO string
      end: endTime.toISOString(), // Send as ISO string
      tag: "focus", // Fixed tag as 'focus'
    });
    Alert.alert("Study session added successfully!");
  } catch (error) {
    console.error("Error adding study session:", error);
    Alert.alert("Error adding study session.");
  }
};

export function StopwatchButtons({
  running,
  pauseStopwatch,
  resetStopwatch,
  startStopwatch,
  time, // Time is passed from parent in seconds
}: StopwatchButtonsProps) {
  const [startTime, setStartTime] = useState<Date | null>(null); // Track start time
  const [endTime, setEndTime] = useState<Date | null>(null); // Track end time

  const handleStart = () => {
    setStartTime(new Date()); // Capture start time
    startStopwatch();
  };

  const handleStop = () => {
    const stopTime = new Date(); // Capture end time
    setEndTime(stopTime);

    pauseStopwatch();
    const durationMinutes = calculateDurationMinutes(time); // Calculate duration in minutes

    // Need this for the browser for apple devices
    const alertPolyfill = (
      title: string,
      description: string,
      options: any
    ) => {
      const result = window.confirm(
        [title, description].filter(Boolean).join("\n\n")
      );

      if (result) {
        const confirmOption = options.find(
          (option: any) => option.style !== "cancel"
        );
        confirmOption && confirmOption.onPress();
      } else {
        const cancelOption = options.find(
          (option: any) => option.style === "cancel"
        );
        cancelOption && cancelOption.onPress();
      }
    };

    // Fire the alert asking whether to add the study session
    const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

    alert(
      "Add Hours", // title
      "Would you like to add the tracked hours to your total study time?", // message
      [
        {
          text: "No",
          onPress: () => resetStopwatch(),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            if (startTime) {
              // Add study session to the backend
              addStudySession(durationMinutes, startTime, stopTime);
            }
            resetStopwatch(); // Reset the stopwatch
          },
        },
      ],
      { cancelable: true }
    );
  };

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
