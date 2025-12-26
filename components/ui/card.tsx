import { LinearGradient } from 'react-native-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';

export const Card = ({ children, style }: ViewProps) => (
  <View style={[styles.card, style]}>
    <LinearGradient
      colors={['#FFFFFF', '#ebe7f4ff']}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
    >
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#00000039',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
