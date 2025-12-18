import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
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
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circleContainer, {width: size, height: size}]}>
        <Svg width={size} height={size} style={styles.svg}>
          <G
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          >
            {/* Progress circle - starts from top (12 o'clock) */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={getScoreColor()}
              strokeWidth={4}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={'#D0D2D366'}
              strokeWidth={4}
              fill="transparent"
            />
          </G>
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
    backgroundColor: '#042541',
    borderRadius: 30,
    outlineWidth: 4,
    outlineColor: '#042541',
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

