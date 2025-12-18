import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {colors} from '@/theme';

interface UserScoreProps {
  score: number; // 0-10 scale
  size?: number;
}

const UserScore: React.FC<UserScoreProps> = ({score, size = 60}) => {
  const percentage = (score / 10) * 100;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on score
  const getScoreColor = (): string => {
    return '#45FF8F';
    if (percentage >= 70) return '#4CAF50'; // Green
    if (percentage >= 50) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circleContainer, {width: size, height: size}]}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.background}
            strokeWidth={4}
            fill="transparent"
          />
          {/* Progress circle - rotated by adjusting start point */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getScoreColor()}
            strokeWidth={4}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset + circumference * 0.25}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
      <Text style={styles.label}>User Score</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  scoreContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
  },
});

export default UserScore;

