import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import ChevronRight from '@/assets/icon/chevron-right.svg';
import { colors } from '@/theme';

interface ExpandableProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onToggle?: (isExpanded: boolean) => void;
}

const Expandable: React.FC<ExpandableProps> = ({
  title,
  children,
  initiallyExpanded = false,
  style,
  headerStyle,
  contentStyle,
  titleStyle,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(
    new Animated.Value(initiallyExpanded ? 1 : 0),
  ).current;
  const rotateAnim = useRef(
    new Animated.Value(initiallyExpanded ? 1 : 0),
  ).current;

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.parallel([
      Animated.timing(animation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onToggle?.(newExpandedState);
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && contentHeight === 0) {
      setContentHeight(height);
    }
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 1000],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.header, headerStyle]}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronRight width={10} height={14} />
        </Animated.View>
      </TouchableOpacity>
        <Animated.View
          style={[
            styles.content,
            contentStyle,
            {
              height: heightInterpolate,
              opacity: animation,
            },
          ]}
        >
          <View onLayout={onContentLayout} style={styles.contentInner}>
            {children}
          </View>
        </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  content: {
  },
  contentInner: {
    width: '100%',
    position: 'absolute',
  },
});

export default Expandable;
