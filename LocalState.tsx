// LocalState.ts
class LocalState {
  private static instance: LocalState;
  private groupMembersData: { [key: string]: { name: string; hours: number }[] };
  private user: { name: string; hours: number; sessions: number; longestSession: number; types: number };

  private constructor() {
    // User's study data (this can be dynamic in a real app)
    this.user = {
      name: 'Cham',
      hours: 20,
      sessions: 5,
      longestSession: 2,
      types: 3
    };

    this.groupMembersData = {
      'Friends': [
        { name: 'Ikram', hours: 32 },
        { name: 'Lavinia', hours: 27 },
        {name: this.user.name, hours: this.user.hours},
        { name: 'Saanvi', hours: 10 }
      ],
      'Hackathon': [
        { name: 'Ikram', hours: 32 },
        {name: this.user.name, hours: this.user.hours},
      ]
    };

  
  }

  // Ensure that only one instance of the class exists
  public static getInstance(): LocalState {
    if (!LocalState.instance) {
      LocalState.instance = new LocalState();
    }
    return LocalState.instance;
  }

  // Get group data
  public getGroupMembersData() {
    return this.groupMembersData;
  }

  // Get the current user's data
  public getUserData() {
    return this.user;
  }

  public addGroup(groupName: string) {
    this.groupMembersData[groupName] = [{ name: this.user.name, hours: this.user.hours }];
  }
}

export default LocalState;
