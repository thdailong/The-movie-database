import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/theme';
import Logo from '@/assets/img/logo.svg';

interface ContainerProps {
  children: React.ReactNode;
  showLogo?: boolean;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({
  children,
  showLogo = true,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top},
        style,
      ]}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <Logo width={80} height={58} />
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});

export default Container;

