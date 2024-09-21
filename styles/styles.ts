import { StyleSheet } from "react-native";

export const textColor = "#1D192B";
export const backgroundColor = "#E0C7E9";
export const navbarBackgroundColor = "#F3EDF7";
export const accentColor = "#D74A76";

export const baseUnit = 8;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: baseUnit * 2,
    paddingVertical: baseUnit * 2,
  },
  titleText: {
    fontSize: baseUnit * 2 + baseUnit,
    fontWeight: "bold",
    color: textColor,
  },
  bodyText: {
    color: textColor,
  },
  timer_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    color: "green",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "blue",
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "#2ecc71",
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#f39c12",
  },
  resumeButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
