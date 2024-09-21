// LeaderboardList.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type StopwatchButtonsProps = {
  running: boolean;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  startStopwatch: () => void;
};

export function StopwatchButtons({
  running,
  pauseStopwatch,
  resetStopwatch,
  startStopwatch,
}: StopwatchButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      {running ? (
        <>
          {/* stop stopwatch */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => {
              // pauses stopwatch
              pauseStopwatch();

              // fires alert
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
                    onPress: () => resetStopwatch(),
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <MaterialCommunityIcons name="stop" color={"#D74A76"} size={50} />
          </TouchableOpacity>
          {/* pause stopwatch */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={pauseStopwatch}
          >
            <MaterialCommunityIcons name="pause" color={"#D74A76"} size={50} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* starts stopwatch  */}
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={startStopwatch}
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
  playButton: {
    width: 30,
    height: 30,
    backgroundColor: "#E74C3C", // Red for the play button
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});
