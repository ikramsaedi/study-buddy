import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  doubleBaseUnit,
  bodyFontSize,
  accentColor,
  baseUnit,
  backgroundColor,
  titleFontSize,
  textColor,
  smallerTitleFontSize,
  LargeNumberText,
  smallFontSize,
  tripleBaseUnit,
} from "../styles/styles";
import { StatCard } from "../components/StatCard";
import axios from "axios";
import { ROOT_URL } from "../config";
import LocalState from "../LocalState";

export const Profile = () => {
  const localState = LocalState.getInstance();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${ROOT_URL}/api/profile`, {
          params: { userId: localState.getUserDataId() }, // Replace with dynamic userId if needed
        });
        setProfileData(response.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageWrapper}>
          {/* Replace with a real Image source */}
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>{profileData.name}</Text>
        <TouchableOpacity style={styles.editButton}  onPress={() => Alert.alert("Not Implemented", "This feature is not part of the MVP.")}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Groups</Text>
          </View>
        </View>
      </View>

      {/* Today's Overview */}

      <StatCard />

      {/* Weekly Overview */}
      <View style={styles.weeklyOverviewContainer}>
        <Text style={styles.weeklyOverviewTitle}>Weekly Overview</Text>
        {/* Placeholder for the bar chart */}
        <View style={styles.barChartPlaceholder}>
          <Text>Bar chart goes here</Text>
        </View>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.infoText}>{profileData.name}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.infoText}>{profileData.gender}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Pronouns</Text>
          <Text style={styles.infoText}>{profileData.pronouns}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Degree</Text>
          <Text style={styles.infoText}>{profileData.degree}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Goal of Study Hours / Week</Text>
          <Text style={styles.infoText}>
            {Math.round(profileData.goalMinutes / 60)} hours
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: doubleBaseUnit,
    paddingVertical: 40,
    backgroundColor: backgroundColor,
  },
  avatar: {
    width: baseUnit * 10,
    height: baseUnit * 10,
    borderRadius: baseUnit * 5,
    backgroundColor: "#8B5E83", // Darker purple for the avatar placeholder
    marginBottom: baseUnit,
  },
  profileName: {
    fontSize: titleFontSize,
    fontWeight: "bold",
    color: textColor,
    marginBottom: baseUnit,
  },
  profileInfo: {
    backgroundColor: "#f0f0f5",
    borderRadius: 12,
    padding: doubleBaseUnit,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: doubleBaseUnit,
  },
  infoBlock: {
    marginBottom: doubleBaseUnit,
  },
  label: {
    fontSize: bodyFontSize,
    color: "#7F7F7F", // Grey color for labels
  },
  infoText: {
    fontSize: smallerTitleFontSize,
    fontWeight: "bold",
    color: "#333", // Dark color for the info text
  },

  profileSection: {
    alignItems: "center",
    marginBottom: doubleBaseUnit,
  },
  profileImageWrapper: {
    width: baseUnit * 12.5,
    height: baseUnit * 12.5,
    borderRadius: baseUnit * 6.25,
    overflow: "hidden",
    backgroundColor: "#f0f0f5",
    marginBottom: baseUnit,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  editButton: {
    backgroundColor: "#50BC9C",
    paddingHorizontal: doubleBaseUnit + baseUnit,
    paddingVertical: baseUnit * 1.25,
    borderRadius: baseUnit * 2.5,
    marginBottom: doubleBaseUnit,
  },
  editButtonText: {
    color: "#f0f0f5",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: baseUnit * 1.25,
  },
  statItem: {
    alignItems: "center",
  },
  c: {
    fontSize: smallerTitleFontSize,
    fontWeight: "bold",
    color: textColor,
  },
  statNumber: {
    fontSize: LargeNumberText,
    fontWeight: "bold",
    color: textColor,
  },
  statLabel: {
    fontSize: smallFontSize,
    color: textColor,
  },
  weeklyOverviewContainer: {
    backgroundColor: "#f0f0f5",
    borderRadius: 12,
    padding: doubleBaseUnit,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  weeklyOverviewTitle: {
    fontSize: bodyFontSize,
    fontWeight: "bold",
    marginBottom: baseUnit,
    color: textColor,
  },
  barChartPlaceholder: {
    height: tripleBaseUnit + baseUnit * 4,
    backgroundColor: "#d99abf",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: baseUnit * 1.25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
  },
  errorText: {
    color: textColor,
    fontSize: bodyFontSize,
  },
});
