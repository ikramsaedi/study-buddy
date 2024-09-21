import React from 'react';
import { ScrollView, View } from 'react-native';
import { doubleBaseUnit} from '../styles/styles';
import { LeaderboardList } from '../components/LeaderboardList';
import { StatCard } from '../components/StatCard';

export function Leaderboard() {
  return (
    <ScrollView>
      {/* Stat Card */}
      <View style={{ padding: doubleBaseUnit }} >
        <StatCard />
      </View>

      {/* Leaderboard List */}
      <LeaderboardList/>
    </ScrollView>
  );
}
