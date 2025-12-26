import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { BlurView } from '@sbaiahmed1/react-native-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TAB_ICONS } from '../constants';
import type { RouteName, TabItem } from '../types';
import { Typography } from './ui/typography';

export const BottomTabbar = ({
  state,
  navigation,
  style,
}: BottomTabBarProps & { style?: ViewStyle }) => (
  <BlurView
    blurType={Platform.OS === 'ios' ? 'systemMaterial' : 'light'}
    blurAmount={Platform.OS === 'ios' ? 20 : 10}
    style={[styles.glassContainer, style]}
  >
    <View style={styles.tabRow}>
      {state.routes.map((route, index) => {
        const routeName = route.name as RouteName;
        const isFocused = state.index === index;

        if (!(routeName in TAB_ICONS)) return null;

        const onPress = () => navigation.navigate(route.name);

        return (
          <TabItem
            key={route.key}
            routeName={routeName}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  </BlurView>
);

const TabItem = ({ routeName, isFocused, onPress }: TabItem) => {
  const Icon = TAB_ICONS[routeName];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, isFocused && styles.tabButtonFocusedBorder]}
    >
      {isFocused ? (
        <BlurView
          blurType={
            Platform.OS === 'ios'
              ? 'systemMaterial'
              : isFocused
              ? 'xlight'
              : 'regular'
          }
          blurAmount={Platform.OS === 'ios' ? 20 : 0}
          style={[styles.tabItem, styles.focusedBlurContainer]}
        >
          <View style={styles.iosContainer}>
            <Icon size={22} color="#000" />
            <Typography weight="medium" style={styles.label}>
              {routeName}
            </Typography>
          </View>
        </BlurView>
      ) : (
        <View style={styles.tabItem}>
          <Icon size={22} color="#000" />
          <Typography weight="medium" style={styles.label}>
            {routeName}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: 4,
    borderRadius: 200,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12 },
    }),
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  tabButton: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabButtonFocusedBorder: {
    borderColor: 'rgba(255,255,255,0.5)',
  },
  focusedBlurContainer: {
    borderColor: 'rgba(255,255,255,1)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
});
