import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MoreMenu } from './MoreMenu';
import { accentColor, backgroundColor, baseIconSize, baseUnit, bodyFontSize, doubleBaseUnit } from '../styles/styles';
import LocalState from '../LocalState';
import { fetchGroupMembers, fetchStudyGroups } from '../helpers/leaderboardService';

export function LeaderboardList() {
  const localState = LocalState.getInstance();
  const [selectedTab, setSelectedTab] = useState('');
  const [members, setMembers] = useState<{ name: string; minutes: number }[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [groups, setGroups] = useState<{ [key: number]: string }>({});
  
  // UseRef to store group data across renders without causing re-renders
  const groupWithData = useRef<{ [key: string]: { name: string; minutes: number }[] }>({});

  // Fetch members for the selected group and update state
  const fetchAndSetMembers = async (groupName: string) => {
    const groupId = parseInt(Object.keys(groups).find(key => groups[parseInt(key)] === groupName) || '', 10);
    if (groupWithData.current[groupName]) {
      // If the group data is already cached, use it
      setMembers(groupWithData.current[groupName]);
    } else if (!isNaN(groupId)) {
      // Otherwise, fetch the group members and cache it
      const groupMembers = await fetchGroupMembers(groupId);
      groupWithData.current[groupName] = groupMembers;
      setMembers(groupMembers);
    }
  };

  useEffect(() => {
    // Fetch study groups and set the default tab
    const loadGroups = async () => {
      const groupData = await fetchStudyGroups();
      setGroups(groupData);

      // Set default tab to the first group (first key in groupData)
      const firstGroupName = groupData[Object.keys(groupData)[0]];
      setSelectedTab(firstGroupName);
      
      // Fetch members for the first group and cache it
      const groupId = parseInt(Object.keys(groupData)[0], 10);
      const groupMembers = await fetchGroupMembers(groupId);
      groupWithData.current[firstGroupName] = groupMembers;
      setMembers(groupMembers);
    };

    loadGroups();
  }, []);

  const handleGroupSelect = (group: string) => {
    setSelectedTab(group);
    fetchAndSetMembers(group); // Fetch and display members when the tab is switched
  };

  const handleCreateGroup = (groupName: string) => {
    // fix this
    setSelectedTab(groupName);
    setMembers([{ name: 'You', minutes: 0 }]);
  };

  return (
    <>
      {/* Group tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {Object.keys(groups).map(groupId => (
            <TouchableOpacity key={groupId} onPress={() => handleGroupSelect(groups[parseInt(groupId)])} style={selectedTab === groups[parseInt(groupId)] ? [styles.tab, styles.selectedTab] : styles.tab}>
              <Text style={selectedTab === groups[parseInt(groupId)] ? [styles.tabText, styles.selectedTabText] : styles.tabText}>{groups[parseInt(groupId)]}</Text>
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
            <Text style={styles.hoursText}>{Math.floor(user.minutes / 60)}h {user.minutes % 60}m</Text>
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