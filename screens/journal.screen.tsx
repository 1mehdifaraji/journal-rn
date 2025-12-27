import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Image, MessageCircle, Mic, Sparkles } from 'lucide-react-native';

import {
  Container,
  Header,
  Input,
  Typography,
  VoiceRecordModal,
} from '../components';
import { useNavigation } from '../hooks';
import { useJournalStore } from '../store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Voice from '@react-native-voice/voice';

export const JournalScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { setEntry } = useJournalStore();
  const { setOptions, goBack } = useNavigation();
  const [text, setText] = useState('');
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        const spokenText = e.value[0].trim();
        if (spokenText) {
          setText(prev => (prev ? prev + ' ' + spokenText : spokenText));
        }
        setIsListening(false);
        setVoiceModalVisible(false);
      }
    };

    Voice.onSpeechError = (e: any) => {
      console.log('Speech error:', e.error);
      Alert.alert('Oops', 'Couldn’t recognize your voice. Try again!');
      setIsListening(false);
      setVoiceModalVisible(false);
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };
  }, []);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Header
          onPress={() => {
            if (text.trim()) setEntry(text.trim());
            goBack();
          }}
          variant="secondary"
        />
      ),
    });
  });

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs microphone access to record your voice.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleVoiceRecord = async () => {
    if (isListening) {
      try {
        await Voice.stop();
        setIsListening(false);
      } catch (err) {
        console.log('Stop error:', err);
      }
      return;
    }

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Needed',
        'Please allow microphone access in settings.',
      );
      setVoiceModalVisible(false);
      return;
    }

    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (err) {
      console.log('Start error:', err);
      Alert.alert('Error', 'Failed to start voice recording.');
      setVoiceModalVisible(false);
    }
  };

  const showVoiceModal = () => setVoiceModalVisible(true);
  const hideVoiceModal = () => {
    if (isListening) {
      Voice.stop();
      setIsListening(false);
    }
    setVoiceModalVisible(false);
  };

  return (
    <>
      <Container>
        <PromptCard />
        <Input value={text} onChangeText={setText} style={styles.input} />
      </Container>
      <BottomActionBar
        style={{
          bottom: Platform.OS === 'ios' ? bottom : bottom + 15,
        }}
        onVoicePress={showVoiceModal}
      />
      <VoiceRecordModal
        visible={voiceModalVisible}
        onClose={hideVoiceModal}
        onPress={handleVoiceRecord}
        isListening={isListening}
      />
    </>
  );
};

const PromptCard = () => (
  <View
    style={{
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#fff',
      overflow: 'hidden',
      marginTop: 20,
    }}
  >
    <LinearGradient
      colors={['#edf3ffff', '#e6e9ffff']}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
    >
      <View
        style={{
          paddingVertical: 4,
          paddingStart: 10,
          paddingEnd: 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography style={styles.promptText}>
          What&apos;s on your mind?
        </Typography>
        <InspireButton />
      </View>
    </LinearGradient>
  </View>
);

const InspireButton = () => (
  <TouchableOpacity
    style={{
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}
    activeOpacity={0.7}
  >
    <LinearGradient
      colors={['#FFFFFF', 'rgba(0,0,0,0.09)']}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
    >
      <View
        style={[
          styles.inspireButton,
          {
            paddingVertical: 10,
            paddingHorizontal: 14,
          },
        ]}
      >
        <Sparkles size={16} strokeWidth={1} color="#000" fill="#000" />
        <Typography weight="medium" style={styles.inspireText}>
          Inspire me
        </Typography>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const BottomActionBar = ({
  onVoicePress,
  style,
}: {
  onVoicePress: () => void;
  style?: ViewStyle;
}) => (
  <View style={[styles.bottomTabBar, style]}>
    <View style={[styles.bottomBarContainer]}>
      <LinearGradient
        colors={
          Platform.OS === 'ios' ? ['#fff', '#fff'] : ['#fff', 'rgba(0,0,0,0)']
        }
        start={{ x: 0.7, y: 1 }}
        end={{ x: 0.7, y: 0 }}
      >
        <View style={styles.bottomBar}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={onVoicePress}>
            <Mic size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <MessageCircle size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  </View>
);

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },

  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',

    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.6)',
    marginTop: 20,
  },

  promptText: {
    flex: 1,
    letterSpacing: 0.4,
    fontSize: 16,
    opacity: 0.7,
  },

  inspireButton: {
    backgroundColor: '#F1F1F1',

    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  inspireText: {
    fontSize: 12,
  },

  bottomTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  bottomBarContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },

  bottomBar: {
    flexDirection: 'row',
    gap: 45,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 8,
    shadowColor: 'rgba(0,0,0,0.6)',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
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
