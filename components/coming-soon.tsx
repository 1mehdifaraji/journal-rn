import { StyleSheet, View } from 'react-native';
import { Typography } from './ui/typography';

export const ComingSoon = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Typography weight="medium" style={styles.text}>
      {title} (Coming Soon)
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    opacity: 0.6,
  },
});
