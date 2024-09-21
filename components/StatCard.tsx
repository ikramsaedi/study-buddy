import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bodyFontSize, doubleBaseUnit, baseUnit, LargeNumberText, smallerTitleFontSize, smallFontSize } from '../styles/styles';
import LocalState from '../LocalState'; // Import the LocalState

// Fetch user data
const localState = LocalState.getInstance();
const userData = localState.getUserData();

export function StatCard() {
  const hoursStudied = { hours: Math.floor(userData.hours), minutes: (userData.hours % 1) * 60 };
  const longestSession = { hours: Math.floor(userData.longestSession), minutes: (userData.longestSession % 1) * 60 };
  const sessions = userData.sessions;
  const types = userData.types;
  const formattedDate = new Date().toLocaleDateString("en-AU", { day: 'numeric', month: 'long' });

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.dateText}>Today - {formattedDate}</Text>

      {/* Hours Study Stat card */}
      <View style={styles.statsCard}>
        <Text style={styles.hoursText}>Hours Studied</Text>
        <Text style={styles.hoursStudied}>{hoursStudied.hours}h {hoursStudied.minutes}m</Text>

        {/* Extra stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{sessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{longestSession.hours}h {longestSession.minutes}m</Text>
            <Text style={styles.statLabel}>Longest</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{types}</Text>
            <Text style={styles.statLabel}>Types</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    marginBottom: doubleBaseUnit,
  },
  dateText: {
    fontSize: bodyFontSize,
    color: '#666',
    marginBottom: baseUnit,
  },
  statsCard: {
    backgroundColor: '#f0f0f5',
    borderRadius: 12,
    padding: doubleBaseUnit,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  hoursText: {
    fontSize: bodyFontSize,
    color: '#666',
  },
  hoursStudied: {
    fontSize: LargeNumberText,
    fontWeight: 'bold',
    color: '#50BC9C',
    marginVertical: baseUnit,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: baseUnit,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: smallerTitleFontSize,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: smallFontSize,
    color: '#666',
  },
});
