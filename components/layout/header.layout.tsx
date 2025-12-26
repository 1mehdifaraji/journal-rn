import { Bell, CalendarIcon, Check, ChevronLeft } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  type TouchableOpacityProps,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from './container.layout';
import { useNavigation } from '../../hooks';
import { Calendar } from '../ui/calendar';
import { Typography } from '../ui/typography';
import type {
  HeaderProps,
  PrimaryHeaderProps,
  SecondaryHeaderProps,
} from '../../types';

export const Header = ({
  title = 'Header',
  variant = 'primary',
  onPress,
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack, navigate } = useNavigation();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return (
    <>
      <StatusBar barStyle="dark-content" animated />
      <Container>
        <View style={[styles.wrapper, { marginTop: top }]}>
          {variant === 'secondary' ? (
            <SecondaryHeader
              onPress={onPress}
              date={formattedDate}
              canGoBack={canGoBack}
              goBack={goBack}
            />
          ) : (
            <PrimaryHeader navigate={navigate} title={title} />
          )}
        </View>
        {variant === 'primary' ? <Calendar /> : null}
      </Container>
    </>
  );
};

const PrimaryHeader = ({ title, navigate }: PrimaryHeaderProps) => (
  <>
    <Typography weight="bold" style={styles.title}>
      {title}
    </Typography>
    <NotificationBell onPress={() => navigate('Notifications')} />
  </>
);

const SecondaryHeader = ({
  canGoBack,
  goBack,
  date,
  onPress,
}: SecondaryHeaderProps) => (
  <>
    {canGoBack() ? <GradientBackButton onPress={goBack} /> : null}
    <View style={styles.dateRow}>
      <CalendarIcon size={16} color="#000" />
      <Typography style={styles.dateText}>{date}</Typography>
    </View>
    {onPress ? (
      <PrimaryIconButton onPress={onPress}>
        <Check size={24} color="#fff" />
      </PrimaryIconButton>
    ) : null}
  </>
);

const NotificationBell = ({ onPress }: TouchableOpacityProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={styles.notificationWrapper}
  >
    <View style={styles.notificationDot} />
    <Bell size={22} color="#000" />
  </TouchableOpacity>
);

const GradientBackButton = ({ onPress }: TouchableOpacityProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <LinearGradient
      colors={['#edf3ffff', '#e6e9ffff']}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
      style={styles.gradientBackButton}
    >
      <View style={styles.iconWrapper}>
        <ChevronLeft size={24} color="#000" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const PrimaryIconButton = ({ children, onPress }: TouchableOpacityProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.iconButton, styles.iconButtonPrimary]}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },

  spacer: {
    width: 38,
    height: 38,
  },

  title: {
    fontSize: 18,
    color: '#000',
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.2)',
  },

  iconButtonPrimary: {
    backgroundColor: '#6D5DF6',
    elevation: 0,
  },

  gradientBackButton: {
    width: 38,
    height: 38,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,

    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    borderWidth: 1,
    borderColor: '#fff',
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -2 }],
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  dateText: {
    fontSize: 14,
    color: '#000',
  },

  notificationWrapper: {
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#5D00F3',
    zIndex: 1,
  },
});
