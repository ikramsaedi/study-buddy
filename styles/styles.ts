import { StyleSheet } from "react-native";

export const textColor = "#1D192B";
export const backgroundColor = "#E9DEEE";
export const navbarBackgroundColor = "#F3EDF7";
export const accentColor = "#D74A76";
export const baseIconSize = 24;

export const baseUnit = 8;
export const doubleBaseUnit = baseUnit * 2;
export const tripleBaseUnit = baseUnit * 3;

// Fonts
export const LargeNumberText = 40;
export const titleFontSize = 24;
export const smallerTitleFontSize = 18;
export const bodyFontSize = 16;
export const smallFontSize = 14;

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
