import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  ConnectScreen,
  HomeScreen,
  ProfileScreen,
  TrendScreen,
} from '../screens';

import type { BottomTabs } from '../types';
import { BottomTabbar, Header } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator<BottomTabs, 'BottomTabs'>();

export const Tabs = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      id="BottomTabs"
      tabBar={props => (
        <BottomTabbar
          {...props}
          style={{ bottom: Platform.OS === 'ios' ? bottom : bottom + 15 }}
        />
      )}
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        header: () => <Header title="Good morning!" />,
      }}
    >
      <Tab.Screen name="Proday" component={HomeScreen} />
      <Tab.Screen name="Connect" component={ConnectScreen} />
      <Tab.Screen name="Trend" component={TrendScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
