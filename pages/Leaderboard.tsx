import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { bodyFontSize, doubleBaseUnit, tripleBaseUnit, styles as sharedStyles, LargeNumberText, baseUnit, smallerTitleFontSize, smallFontSize, accentColor } from '../styles/styles';

export function Leaderboard() {
  type Member = {
    name: string;
    hours: number;
  };

  type GroupMembersData = {
    [k: string]: Member[]; 
  }

   const groupMembersData: GroupMembersData = {
    'Friends': [
      { name: 'Ikram', hours: 32 },
      { name: 'Lavinia', hours: 27 },
      { name: 'Cham', hours: 18 },
      { name: 'Saanvi', hours: 10 }
    ],
    'Hackathon': [
      { name: 'Ikram', hours: 32 },
      { name: 'Cham', hours: 18 },
    ],
    'StudyGroup': [
      { name: 'Emma', hours: 28 },
      { name: 'Chris', hours: 21 },
      { name: 'Cham', hours: 18 },
    ]
  };

  const [selectedTab, setSelectedTab] = useState('Friends');
  const [members, setMembers] = useState(  groupMembersData['Friends']);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long' });

  // This will be replaced by actual data
  const hoursStudied = {hours: 18, minutes: 10};
  const longestSession = {hours: 2, minutes: 12};
  const sessions = 11;
  const types = 3;

  const handleGroupSelect = (group: string) => {
    setSelectedTab(group);
    setMembers(groupMembersData[group]);  
  };

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

      {/* Group tabs */}
      <View style={styles.tabsContainer}>
        {Object.keys(groupMembersData).map(group => (
          <TouchableOpacity key={group} onPress={() => handleGroupSelect(group)} style={selectedTab === group ? styles.selectedTab : styles.tab}>
            <Text style={selectedTab === group ? styles.selectedTabText : styles.tabText}>{group}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard Section */}
      <View style={styles.leaderboardContainer}>
        {members.map((user, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.rankText}>{index + 1}</Text>
            
            {/* Profile Picture Placeholder */}
            <View style={styles.profilePicPlaceholder} />

            <View style={styles.userContainer}>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <Text style={styles.hoursText}>{user.hours} hrs</Text>
          </View>
        ))}
      </View>

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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',  // Light gray border for the tab container
  },
  tab: {
    paddingVertical: baseUnit,
    paddingHorizontal: doubleBaseUnit,
    borderBottomWidth: 3,
    borderColor: 'transparent',  // No underline for inactive tabs
  },
  selectedTab: {
    paddingVertical: baseUnit,
    paddingHorizontal: doubleBaseUnit,
    borderBottomWidth: 3,
    borderColor: accentColor,  // Pink underline for active tab
  },
  tabText: {
    fontSize: smallerTitleFontSize,
    color: '#666',
  },
  selectedTabText: {
    fontSize: smallerTitleFontSize,
    fontWeight: 'bold',
    color: accentColor,
  },
  leaderboardContainer: {
    padding: doubleBaseUnit,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space the rank, name, and hours
    alignItems: 'center',      // Align all elements vertically
    paddingVertical: baseUnit,
  },
  rankText: {
    fontSize: bodyFontSize,
    fontWeight: 'bold',
    color: '#999',
    marginRight: baseUnit, // Add margin to separate rank from name
  },
  profilePicPlaceholder: {
    width: 30,              // Width of the circle
    height: 30,             // Height of the circle
    borderRadius: 15,       // Half of width and height for perfect circle
    backgroundColor: '#000', // Placeholder color, replace with actual image if needed
    marginRight: baseUnit,   // Space between profile picture and name
  },
  userContainer: {
    flex: 1,                   // Take full width for the names
    justifyContent: 'flex-start', // Align names to the start (left-align within their column)
  },
  userName: {
    fontSize: bodyFontSize,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',         // Ensure text is left-aligned
  },
  groupTitle: {
    fontSize: smallerTitleFontSize,
    color: '#666',
  },
});
