import React, { useState, useRef } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import Stopwatch from "react-native-stopwatch-timer";
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

  return (
    <View style={styles.timer_container}>
      <Text style={styles.timeText}>{time}s</Text>
      <View style={styles.buttonContainer}>
        {running ? (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseStopwatch}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startStopwatch}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
        {!running && (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={resumeStopwatch}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
