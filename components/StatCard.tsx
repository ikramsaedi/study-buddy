import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bodyFontSize, doubleBaseUnit, baseUnit, LargeNumberText, smallerTitleFontSize, smallFontSize } from '../styles/styles';
import axios from 'axios';

export function StatCard() {
  const [userStats, setUserStats] = useState({
    totalMinutes: 0,
    longestSession: 0,
    sessions: 0,
    types: 0,
  });

  const formattedDate = new Date().toLocaleDateString("en-AU", { day: 'numeric', month: 'long' });

  // Fetch user statistics from the API
  useEffect(() => {
    const userId = 1; // Replace this with the actual logged-in user ID

    // We have to replace this url with your IP Address
    axios.get(`http://192.168.211.174:3000/api/user/${userId}/stats`)
      .then(response => {
        setUserStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching user stats:', error);
      });
  }, []);

  const hoursStudied = {
    hours: Math.floor(userStats.totalMinutes / 60),
    minutes: userStats.totalMinutes % 60,
  };
  const longestSession = {
    hours: Math.floor(userStats.longestSession / 60),
    minutes: userStats.longestSession % 60,
  };

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
            <Text style={styles.statNumber}>{userStats.sessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{longestSession.hours}h {longestSession.minutes}m</Text>
            <Text style={styles.statLabel}>Longest</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.types}</Text>
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