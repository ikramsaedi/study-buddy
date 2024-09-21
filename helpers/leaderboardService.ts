import axios from 'axios';

// Fetch members for a specific group
export const fetchGroupMembers = async (groupId: number) => {
  try {
    const response = await axios.get(`http://192.168.211.174:3000/api/groups/${groupId}/members`); // API to get group members
    return response.data.members.map((member: { name: string, minutes: number }) => ({
      name: member.name,
      minutes: member.minutes
    }));
  } catch (error: any) {
    console.error(`Error fetching members for group ${groupId}:`, error.message || error);
    return [];
  }
};

// Fetch study groups from the API
export const fetchStudyGroups = async () => {
  try {
    const response = await axios.get(`http://192.168.211.174:3000/api/user/1/studyGroups`); // Change userId as needed
    return response.data.studyGroups.reduce((acc: { [key: number]: string }, group: { id: number, name: string }) => {
      acc[group.id] = group.name;
      return acc;
    }, {});
  } catch (error: any) {
    console.error('Error fetching study groups:', error.message || error);
    return {};
  }
};
