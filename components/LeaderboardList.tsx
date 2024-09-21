import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MoreMenu } from './MoreMenu';
import { accentColor, backgroundColor, baseIconSize, baseUnit, bodyFontSize, doubleBaseUnit } from '../styles/styles';
import LocalState from '../LocalState';

export function LeaderboardList() {
  const localState = LocalState.getInstance(); // Access the singleton instance
  const initialGroupMembersData = localState.getGroupMembersData(); // Get data from singleton

  const [selectedTab, setSelectedTab] = useState('Friends');
  const [members, setMembers] = useState(initialGroupMembersData['Friends']);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleGroupSelect = (group: string) => {
    setSelectedTab(group);
    setMembers(initialGroupMembersData[group]);
  };

  const handleCreateGroup = (groupName: string) => {
    localState.addGroup(groupName); // Add group to singleton
    setSelectedTab(groupName);
    setMembers([{ name: 'You', hours: 0 }]);
  };

  return (
    <>
      {/* Group tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {Object.keys(initialGroupMembersData).map(group => (
            <TouchableOpacity key={group} onPress={() => handleGroupSelect(group)} style={selectedTab === group ? [styles.tab, styles.selectedTab] : styles.tab}>
              <Text style={selectedTab === group ? [styles.tabText, styles.selectedTabText] : styles.tabText}>{group}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => setShowMoreMenu(true)} style={styles.moreButton}>
          <Feather name="more-vertical" size={baseIconSize} color={accentColor} />
        </TouchableOpacity>
      </View>

      {/* More Menu */}
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
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    position: 'relative',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    flexGrow: 1,
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
    position: 'absolute',
    right: 0, 
    paddingHorizontal: baseUnit / 2,
    justifyContent: 'center',
    backgroundColor: backgroundColor,
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
    color: '#000',
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