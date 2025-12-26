import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { fonts, JOURNAL_CHAR_LIMIT } from '../../constants';

export const Input = ({ value, onChangeText }: TextInputProps) => (
  <TextInput
    style={styles.input}
    placeholder="Start writing..."
    multiline
    value={value}
    maxLength={JOURNAL_CHAR_LIMIT}
    onChangeText={onChangeText}
    textAlignVertical="top"
    placeholderTextColor="#656565ff"
  />
);

const styles = StyleSheet.create({
  input: {
    minHeight: 260,
    padding: 16,
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 0.5,
    fontFamily: fonts.regular,
  },
});
