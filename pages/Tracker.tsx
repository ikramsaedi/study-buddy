import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../styles/styles"; // Ensure this path is correct

export const Tracker = () => {
  // State and refs to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

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
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  // Function to resume the stopwatch
  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
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

  return (
    <View style={styles.timer_container}>
      {/* <Text style={styles.titleText}>Tracker</Text> */}
      {/* Study Tracker Header */}
      <Text style={styles.startText}>Start tracking study now!</Text>

      {/* Circular Tracker */}
      <View style={styles.trackerBackground}>
        <View style={styles.trackerContainer}>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </View>
      </View>

      {/* Play/Pause/Reset Button */}
      <View style={styles.buttonContainer}>
        {running ? (
          // pause button
          <>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={pauseStopwatch}
            >
              <MaterialCommunityIcons name="stop" color={"#D74A76"} size={60} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={pauseStopwatch}
            >
              <MaterialCommunityIcons
                name="pause"
                color={"#D74A76"}
                size={60}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* starts stopwatch  */}
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={startStopwatch}
            >
              <MaterialCommunityIcons name="play" color={"#D74A76"} size={60} />
            </TouchableOpacity>
            {/* resets stopwatch */}
            {/* <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={resetStopwatch}
            >
              <Text style={styles.buttonText}>Reset</Text>
              <MaterialCommunityIcons name="play" color={"#1D192B"} size={20} />
            </TouchableOpacity> */}
          </>
        )}

        {/* {!running && time > 0 && (
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={startStopwatch}
          >
            <MaterialCommunityIcons name="play" color={"#D74A76"} size={60} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};
