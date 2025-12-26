import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TAB_ICONS } from '../constants';

export type BottomTabs = {
  Proday: undefined;
  Connect: undefined;
  Trend: undefined;
  Profile: undefined;
};

export type StackScreens = {
  Tabs: undefined;
  Journal: undefined;
  Notifications: undefined;
};

export type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabs, 'Proday'>,
  NativeStackNavigationProp<StackScreens>
>;

export type RouteName = keyof typeof TAB_ICONS;

export interface TabItem {
  routeName: RouteName;
  isFocused: boolean;
  onPress: () => void;
}
