import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from './Card';
import Skeleton from './Skeleton';
import {colors} from '@/theme';

interface MovieCardSkeletonProps {
  style?: any;
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({style}) => {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.content}>
        {/* Poster skeleton */}
        <Skeleton width={80} height={120} borderRadius={8} />
        
        <View style={styles.info}>
          {/* Title skeleton */}
          <Skeleton width="80%" height={18} borderRadius={4} style={styles.title} />
          
          {/* Date skeleton */}
          <Skeleton width="40%" height={14} borderRadius={4} style={styles.date} />
          
          {/* Overview skeleton - 2 lines */}
          <Skeleton width="100%" height={14} borderRadius={4} style={styles.overview} />
          <Skeleton width="70%" height={14} borderRadius={4} style={styles.overview} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    marginBottom: 8,
  },
  date: {
    marginBottom: 8,
  },
  overview: {
    marginBottom: 6,
  },
});

export default MovieCardSkeleton;

