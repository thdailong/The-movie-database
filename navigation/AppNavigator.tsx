import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList, TabParamList} from './types';
import HomeScreen from '@/screens/home';
import WishlistScreen from '@/screens/wishlist';
import MovieDetailScreen from '@/screens/detail';
import {colors} from '@/theme';
import HomeIcon from '@/assets/icon/home.svg';
import WatchlistIcon from '@/assets/icon/watch-list.svg';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const HomeTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: Math.max(insets.bottom, 5),
          paddingTop: 5,
          height: 40 + Math.max(insets.bottom - 5, 0),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: colors.white,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <HomeIcon width={20} height={20} color={colors.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <WatchlistIcon width={16} height={16} color={colors.white} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={HomeTabs} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

