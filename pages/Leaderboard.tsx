import React from 'react';
import { ScrollView, View } from 'react-native';
import { doubleBaseUnit} from '../styles/styles';
import { LeaderboardList } from '../components/LeaderboardList';
import { StatCard } from '../components/StatCard';

export function Leaderboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-AU', { day: 'numeric', month: 'long' });

  // This will be replaced by actual data
  const hoursStudied = { hours: 18, minutes: 10 };
  const longestSession = { hours: 2, minutes: 12 };
  const sessions = 11;
  const types = 3;



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

      {/* Leaderboard List */}
      <LeaderboardList/>
    </ScrollView>
  );
}
