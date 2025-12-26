import { StyleSheet, View } from 'react-native';
import type { ContainerProps } from '../../types';

export const Container = ({ children, style }: ContainerProps) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
