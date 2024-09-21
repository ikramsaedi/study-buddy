import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MoreMenu } from './MoreMenu';
import { accentColor, backgroundColor, baseIconSize, baseUnit, bodyFontSize, doubleBaseUnit } from '../styles/styles';
import LocalState from '../LocalState';
import axios from 'axios';

export function LeaderboardList() {
  const localState = LocalState.getInstance(); // Access the singleton instance
  const initialGroupMembersData = localState.getGroupMembersData(); // Get data from singleton

  const [selectedTab, setSelectedTab] = useState('Friends');
  const [members, setMembers] = useState(initialGroupMembersData['Friends']);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [groups, setGroups] = useState<{ [key: number]: string }>({});
  const [groupMembersData, setGroupMembersData] = useState<{ [key: string]: { name: string, hours: number }[] }>({});

  useEffect(() => {
    // Fetch study groups from the API
    const fetchStudyGroups = async () => {
      try {
        const response = await axios.get(`http://192.168.211.174:3000/api/user/1/studyGroups`); // Change userId as needed
        console.log("AYA response", response);

        // Access data directly from response
        const groupData = response.data.studyGroups.reduce((acc: { [key: number]: string }, group: { id: number, name: string, start: string, end: string, isAutomatched: boolean }) => {
          acc[group.id] = group.name; 
          return acc;
        }, {});

        setGroups(groupData);

        // Fetch members for each group
        const groupIds = Object.keys(groupData);
        for (const groupId of groupIds) {
          const groupName = groupData[Number(groupId)];
          await fetchGroupMembers(Number(groupId), groupName);
        }

      } catch (error: any) {
        console.error('Error fetching study groups:', error.message || error);
      }
    };

    // Function to fetch the member data for a specific group
    const fetchGroupMembers = async (groupId: number, groupName: string) => {
      try {
        const response = await axios.get(`http://192.168.211.174:3000/api/groups/${groupId}/members`);
        console.log(`Fetching members for group ${groupName}`, response.data);

        // Update groupMembersData state with the fetched member data
        setGroupMembersData(prevState => ({
          ...prevState,
          [groupName]: response.data.members
        }));
      } catch (error: any) {
        console.error(`Error fetching members for group ${groupName}:`, error.message || error);
      }
    };

    fetchStudyGroups();
  }, []);

  console.log("AYA groups", groups);
  console.log("AYA groupMembersData", groupMembersData);



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