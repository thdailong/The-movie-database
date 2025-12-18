import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '@/navigation/types';
import HomeIcon from '@/assets/img/Home.svg';
import {colors} from '@/theme';

type BottomNavBarNavigationProp = BottomTabNavigationProp<TabParamList>;

const BottomNavBar: React.FC = () => {
  const navigation = useNavigation<BottomNavBarNavigationProp>();
  const route = useRoute();
  const currentRoute = route.name;

  const handleHomePress = () => {
    if (currentRoute !== 'Home') {
      navigation.navigate('MainTabs', {
        screen: 'Home',
      });
    }
  };

  const handleWishlistPress = () => {
    if (currentRoute !== 'Wishlist') {
      // navigation.navigate('Wishlist');
      navigation.navigate('MainTabs', {
        screen: 'Wishlist',
      });
    }
  };

  const isHomeActive = currentRoute === 'Home';
  const isWishlistActive = currentRoute === 'Wishlist';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={handleHomePress}
        activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <HomeIcon
            width={20}
            height={15}
            fill={isHomeActive ? colors.primary : colors.text.muted}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            isHomeActive && styles.tabLabelActive,
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={handleWishlistPress}
        activeOpacity={0.7}>
        <Text style={[styles.icon, isWishlistActive && styles.iconActive]}>
          ❤️
        </Text>
        <Text
          style={[
            styles.tabLabel,
            isWishlistActive && styles.tabLabelActive,
          ]}>
          Wishlist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  iconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.muted,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});

export default BottomNavBar;