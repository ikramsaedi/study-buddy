import { StyleSheet } from "react-native";

export const textColor = "#1D192B";
export const backgroundColor = "#E0C7E9";
export const navbarBackgroundColor = "#F3EDF7";
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
});
