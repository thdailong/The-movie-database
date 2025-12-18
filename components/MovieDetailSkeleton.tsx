import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Skeleton from './Skeleton';
import {colors} from '@/theme';

const MovieDetailSkeleton: React.FC = () => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header skeleton */}
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Skeleton width={14} height={10} borderRadius={2} />
            <Skeleton width="60%" height={18} borderRadius={4} />
            <Skeleton width={14} height={14} borderRadius={2} />
          </View>
          <View style={styles.posterRow}>
            <Skeleton width={120} height={180} borderRadius={8} />
            <View style={styles.detailsColumn}>
              <Skeleton width={50} height={20} borderRadius={4} style={styles.badge} />
              <Skeleton width="90%" height={16} borderRadius={4} style={styles.detail} />
              <Skeleton width="80%" height={16} borderRadius={4} style={styles.detail} />
              <Skeleton width="70%" height={16} borderRadius={4} style={styles.detail} />
              <Skeleton width="85%" height={16} borderRadius={4} style={styles.detail} />
            </View>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.mainContent}>
          {/* Score and crew row */}
          <View style={styles.scoreCrewRow}>
            <Skeleton width={60} height={60} borderRadius={30} />
            <View style={styles.crewColumn}>
              <Skeleton width="80%" height={16} borderRadius={4} style={styles.crewItem} />
              <Skeleton width="60%" height={14} borderRadius={4} style={styles.crewRole} />
              <Skeleton width="75%" height={16} borderRadius={4} style={styles.crewItem} />
              <Skeleton width="50%" height={14} borderRadius={4} style={styles.crewRole} />
            </View>
          </View>

          {/* Tagline */}
          <Skeleton width="90%" height={20} borderRadius={4} style={styles.tagline} />

          {/* Overview */}
          <View style={styles.overviewSection}>
            <Skeleton width={100} height={24} borderRadius={4} style={styles.overviewTitle} />
            <Skeleton width="100%" height={16} borderRadius={4} style={styles.overviewText} />
            <Skeleton width="100%" height={16} borderRadius={4} style={styles.overviewText} />
            <Skeleton width="95%" height={16} borderRadius={4} style={styles.overviewText} />
            <Skeleton width="85%" height={16} borderRadius={4} style={styles.overviewText} />
          </View>

          {/* Button skeleton */}
          <Skeleton width={180} height={44} borderRadius={8} style={styles.button} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    backgroundColor: '#00000026',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 19,
    justifyContent: 'space-between',
  },
  posterRow: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 24,
    paddingHorizontal: 28,
  },
  detailsColumn: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 16,
  },
  badge: {
    marginBottom: 8,
  },
  detail: {
    marginBottom: 8,
  },
  mainContent: {
    paddingHorizontal: 28,
    paddingVertical: 34,
  },
  scoreCrewRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  crewColumn: {
    flex: 1,
    marginLeft: 24,
  },
  crewItem: {
    marginBottom: 2,
  },
  crewRole: {
    marginBottom: 12,
  },
  tagline: {
    marginBottom: 15,
  },
  overviewSection: {
    marginBottom: 24,
  },
  overviewTitle: {
    marginBottom: 12,
  },
  overviewText: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 24,
  },
});

export default MovieDetailSkeleton;

