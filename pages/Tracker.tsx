import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StopwatchButtons } from "../components/StopwatchButtons";

export const Tracker = () => {
  // State and refs to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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

  return (
    <>
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
          startStopwatch={startStopwatch}
          pauseStopwatch={pauseStopwatch}
          resetStopwatch={resetStopwatch}
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
    marginBottom: 50,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
});
