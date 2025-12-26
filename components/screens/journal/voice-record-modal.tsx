import { Mic, X } from 'lucide-react-native';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../ui/typography';
import type { VoiceRecordModalProps } from '../../../types';

export const VoiceRecordModal = ({
  visible,
  onClose,
  onPress = () => {},
  style,
}: VoiceRecordModalProps) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent
    statusBarTranslucent
  >
    <View style={styles.overlay}>
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={[styles.sheet, style]}>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <View style={styles.closeButtonBackground}>
            <X size={22} color="#000000b6" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onPress();
            onClose();
          }}
        >
          <LinearGradient
            style={styles.mic}
            colors={['#191324', '#330e71']}
            start={{ x: 0.7, y: 1 }}
            end={{ x: 0.7, y: 0 }}
          >
            <Mic size={32} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <Typography style={styles.sheetText}>Tap to speak</Typography>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sheet: {
    backgroundColor: '#fff',
    paddingTop: 90,
    paddingBottom: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },

  closeButton: {
    position: 'absolute',
    end: 30,
    top: 30,
  },

  closeButtonBackground: {
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderWidth: 1,
    borderColor: '#fff',
  },

  mic: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  sheetText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
