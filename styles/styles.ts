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
  timer_container: {
    flex: 1,
    backgroundColor: '#EADCF3', // Light lavender background
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackerBackground: {
    width: 350,
    height: 350,
    borderRadius: 350, // To make it circular
    borderWidth: 30,
    borderColor: '#F3EDF7', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3EDF7',
  },
  trackerContainer: {
    width: 325,
    height: 325,
    borderRadius: 325, // To make it circular
    borderWidth: 30,
    borderColor: '#C0A9E6', // Purple border color
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F1FB', // Inner white circle background
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  startText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
  playButtonContainer: {
    marginTop: 30,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  playButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E74C3C', // Red for the play button
    borderRadius: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 40,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 25,
    height: 25,
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#555', // Grey text color for buttons
  },
});
