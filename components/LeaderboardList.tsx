import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MoreMenu } from './MoreMenu';  // Import the modified MoreMenu component
import { accentColor, baseIconSize, baseUnit, bodyFontSize, doubleBaseUnit } from '../styles/styles';

type Member = {
  name: string;
  hours: number;
};

type GroupMembersData = {
  [k: string]: Member[];
};

export function LeaderboardList() {
  const initialGroupMembersData: GroupMembersData = {
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

  const [groupMembersData, setGroupMembersData] = useState(initialGroupMembersData);
  const [selectedTab, setSelectedTab] = useState('Friends');
  const [members, setMembers] = useState(groupMembersData['Friends']);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleGroupSelect = (group: string) => {
    setSelectedTab(group);
    setMembers(groupMembersData[group]);
  };

  const handleCreateGroup = (groupName: string) => {
    setGroupMembersData((prevState) => ({
      ...prevState,
      [groupName]: [{ name: 'You', hours: 0 }]  // Add the user as the first member of the new group
    }));
    setSelectedTab(groupName);  // Automatically select the new group
    setMembers([{ name: 'You', hours: 0 }]);  // Set the members for the new group
  };

  return (
    <>
      {/* Group tabs */}
      <View style={styles.tabsContainer}>
        {Object.keys(groupMembersData).map(group => (
          <TouchableOpacity key={group} onPress={() => handleGroupSelect(group)} style={selectedTab === group ? [styles.tab, styles.selectedTab] : styles.tab}>
            <Text style={selectedTab === group ? [styles.tabText, styles.selectedTabText] : styles.tabText}>{group}</Text>
          </TouchableOpacity>
        ))}

        {/* More Icon Button */}
        <TouchableOpacity onPress={() => setShowMoreMenu(true)} style={styles.moreButton}>
          <Feather name="more-vertical" size={baseIconSize} color={accentColor} />
        </TouchableOpacity>
      </View>

      {/* More Menu Component */}
      <MoreMenu
        visible={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
        onCreateGroup={handleCreateGroup}
      />

      {/* Leaderboard List */}
      <View style={styles.leaderboardContainer}>
        {members.map((user, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.rankText}>{index + 1}</Text>
            <View style={styles.profilePicPlaceholder} />
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <Text style={styles.hoursText}>{user.hours} hrs</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    borderColor: accentColor,
  },
  tabText: {
    fontSize: bodyFontSize,
    color: '#666',
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: accentColor,
  },
  moreButton: {
    justifyContent: 'center',
    paddingHorizontal: doubleBaseUnit,
  },
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
  },
  hoursText: {
    fontSize: bodyFontSize,
    color: '#666',
  },
});
