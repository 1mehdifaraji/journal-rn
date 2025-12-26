import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './typography';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
}

export const Button = ({ title, onPress, style }: ButtonProps) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <LinearGradient
      colors={['#e6dff8ff', '#d9ccfaff']}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
      style={[styles.button, style]}
    >
      <Typography weight="medium" style={styles.buttonText}>
        {title}
      </Typography>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#6D5DF6',
    fontSize: 18,
    letterSpacing: 0.2,
  },
});
