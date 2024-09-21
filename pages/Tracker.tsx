import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { StopwatchButtons } from "../components/StopwatchButtons";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
  try {
    // this is problem
    await axios.post("http://192.168.1.100:3000/api/addStudySession", {
      userId: 1, // For user with ID 1
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

export const Tracker = () => {
  // State and refs to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);

  //time state
  const [startTime, setStartTime] = useState<Date | null>(null); // Track start time
  const [endTime, setEndTime] = useState<Date | null>(null); // Track end time

  // Function to start the stopwatch
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;

    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    setRunning(true);
  };

  // Function to pause the stopwatch
  const pauseStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  // Function to format the time as hh:mm:ss
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setStartTime(new Date()); // Capture start time
    startStopwatch();
  };

  const handleStop = () => {
    const stopTime = new Date(); // Capture end time
    setEndTime(stopTime);

    pauseStopwatch();
    const durationMinutes = calculateDurationMinutes(time); // Calculate duration in minutes

    // Fire the alert asking whether to add the study session
    Alert.alert(
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
    <>
      <View style={styles.buttonContainer}>
        {!running && ( // Only show the button when not running
          <TouchableOpacity
            onPress={handleStop} // Use the stop handler
            style={styles.addButton}
          >
            <MaterialCommunityIcons name="plus" color={"#D74A76"} size={40} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.timer_container}>
        <Text style={styles.startText}>Start tracking study now!</Text>

        {/* Circular Time Tracker */}
        <View style={styles.trackerBackground}>
          <View style={styles.trackerContainer}>
            <Text style={styles.timeText}>{formatTime(time)}</Text>
          </View>
        </View>

        {/* Play/Pause/Reset Button */}
        <StopwatchButtons
          running={running}
          pauseStopwatch={pauseStopwatch}
          handleStop={handleStop}
          handleStart={handleStart}
          time={time}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timer_container: {
    flex: 1,
    backgroundColor: "#E9DEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  trackerBackground: {
    width: 350,
    height: 350,
    borderRadius: 350,
    borderWidth: 30,
    borderColor: "#F3EDF7",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3EDF7",
  },
  trackerContainer: {
    width: 325,
    height: 325,
    borderRadius: 325,
    borderWidth: 30,
    borderColor: "#C0A9E6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F1FB",
  },
  timeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  startText: {
    marginBottom: 40,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  buttonContainer: {
    height: 50,
    width: "100%", // Ensure the container takes full width
    padding: 5, // Add some padding if needed
    flexDirection: "row",
    justifyContent: "flex-end", // Ensure content goes to the right
  },
  addButton: {},
});
