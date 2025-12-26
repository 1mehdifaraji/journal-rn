import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { JournalScreen, NotificationsScreen } from '../screens';
import { Tabs } from './tabs.navigation';
import type { StackScreens } from '../types';
import { Header } from '../components';

const Stack = createNativeStackNavigator<StackScreens, 'StackScreens'>();

export const AppNavigator = () => (
  <Stack.Navigator id="StackScreens">
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Journal" component={JournalScreen} />
    <Stack.Screen
      options={{
        header: () => <Header variant="secondary" />,
      }}
      name="Notifications"
      component={NotificationsScreen}
    />
  </Stack.Navigator>
);
