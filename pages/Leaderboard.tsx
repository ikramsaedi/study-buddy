// Leaderboard.tsx
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { bodyFontSize, doubleBaseUnit, accentColor } from '../styles/styles';
import { LeaderboardList } from '../components/LeaderboardList';
import { StatCard } from '../components/StatCard';

export function Leaderboard() {
  type Member = {
    name: string;
    hours: number;
  };

  type GroupMembersData = {
    [k: string]: Member[];
  };

  const groupMembersData: GroupMembersData = {
    'Friends': [
      { name: 'Ikram', hours: 32 },
      { name: 'Lavinia', hours: 27 },
      { name: 'Cham', hours: 18 },
      { name: 'Saanvi', hours: 10 }
    ],
    'Hackathon': [
      { name: 'Ikram', hours: 32 },
      { name: 'Cham', hours: 18 }
    ],
    'StudyGroup': [
      { name: 'Emma', hours: 28 },
      { name: 'Chris', hours: 21 },
      { name: 'Cham', hours: 18 }
    ]
  };

  const [selectedTab, setSelectedTab] = useState('Friends');
  const [members, setMembers] = useState(groupMembersData['Friends']);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long' });

  // This will be replaced by actual data
  const hoursStudied = { hours: 18, minutes: 10 };
  const longestSession = { hours: 2, minutes: 12 };
  const sessions = 11;
  const types = 3;

  const handleGroupSelect = (group: string) => {
    setSelectedTab(group);
    setMembers(groupMembersData[group]);
  };

  return (
    <ScrollView>
      {/* Stat Card */}
      <View style={{ padding: doubleBaseUnit }} >
        <StatCard
          hoursStudied={hoursStudied}
          longestSession={longestSession}
          sessions={sessions}
          types={types}
          formattedDate={formattedDate}
        />
      </View>

      {/* Group tabs */}
      <View style={styles.tabsContainer}>
        {Object.keys(groupMembersData).map(group => (
          <TouchableOpacity key={group} onPress={() => handleGroupSelect(group)} style={selectedTab === group ? styles.selectedTab : styles.tab}>
            <Text style={selectedTab === group ? styles.selectedTabText : styles.tabText}>{group}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard List */}
      <LeaderboardList members={members} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  tab: {
    paddingVertical: doubleBaseUnit,
    paddingHorizontal: doubleBaseUnit,
    borderBottomWidth: 3,
    borderColor: 'transparent',
  },
  selectedTab: {
    paddingVertical: doubleBaseUnit,
    paddingHorizontal: doubleBaseUnit,
    borderBottomWidth: 3,
    borderColor: accentColor,
  },
  tabText: {
    fontSize: bodyFontSize,
    color: '#666',
  },
  selectedTabText: {
    fontSize: bodyFontSize,
    fontWeight: 'bold',
    color: accentColor,
  },
});
