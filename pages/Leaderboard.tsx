import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { bodyFontSize, doubleBaseUnit, tripleBaseUnit, styles as sharedStyles, LargeNumberText, baseUnit, smallerTitleFontSize, smallFontSize } from '../styles/styles';

export function Leaderboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long' });

  // This will be replaced by actual data
  const hoursStudied = {hours: 18, minutes: 10};
  const longestSession = {hours: 2, minutes: 12};
  const sessions = 11;
  const types = 3;



  return (
    <ScrollView style={sharedStyles.container}>
      {/* Top Section - Personal hours information */}
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

      {/* Leader Board - Groups and LeaderBoard show here */}
      <Text style={sharedStyles.titleText}>Leaderboard</Text>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    marginBottom: tripleBaseUnit,
  },
  dateText: {
    fontSize: bodyFontSize,
    color: '#666',
    marginBottom: doubleBaseUnit,
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
