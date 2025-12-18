import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList, TabParamList} from '@/navigation/types';
import HomeIcon from '@/assets/icon/home.svg';
import WatchlistIcon from '@/assets/icon/watch-list.svg';
import {colors} from '@/theme';

type BottomNavBarNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const TABS = [
  {
    name: 'Home',
    icon: HomeIcon,
  },
  {
    name: 'Wishlist',
    icon: WatchlistIcon,
    width: 16,
    height: 16,
  },
];

const BottomNavBar: React.FC = () => {
  const navigation = useNavigation<BottomNavBarNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const currentRoute = route.name;

  const handleTabPress = (name: string) => {
    if (currentRoute !== name) {
      navigation.popTo('MainTabs', {
        screen: name,
      });
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: Math.max(insets.bottom, 5)}]}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handleTabPress(tab.name as keyof TabParamList)}
          activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <tab.icon width={tab.width || 20} height={tab.height || 20} color={colors.white} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 60,
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
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
});

export default BottomNavBar;