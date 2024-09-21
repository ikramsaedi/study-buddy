// LeaderboardList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseUnit, bodyFontSize } from '../styles/styles';

type Member = {
  name: string;
  hours: number;
};

type LeaderboardListProps = {
  members: Member[];
};

export function LeaderboardList({ members }: LeaderboardListProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    padding: baseUnit,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: baseUnit,
  },
  rankText: {
    fontSize: bodyFontSize,
    fontWeight: 'bold',
    color: '#999',
    marginRight: baseUnit,
  },
  profilePicPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    marginRight: baseUnit,
  },
  userContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  userName: {
    fontSize: bodyFontSize,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  hoursText: {
    fontSize: bodyFontSize,
    color: '#666',
  },
});
