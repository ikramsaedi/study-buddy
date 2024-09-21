// LocalState.ts
class LocalState {
  private static instance: LocalState;

  private user: { id: number };

  private constructor() {
    this.user = { id: 1 }; // Default
  }

  // Ensure that only one instance of the class exists
  public static getInstance(): LocalState {
    if (!LocalState.instance) {
      LocalState.instance = new LocalState();
    }
    return LocalState.instance;
  }

  
  // Get the current user's data
  public getUserDataId() {
    return this.user.id;
  }

}

export default LocalState;
