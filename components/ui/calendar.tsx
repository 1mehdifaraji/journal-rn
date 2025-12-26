import { LinearGradient } from 'react-native-linear-gradient';
import { useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from './typography';
import type { DayItem } from '../../types';

export const Calendar = () => {
  const days = useMemo<DayItem[]>(() => {
    const today = new Date();

    return Array.from({ length: 9 }).map((_, i) => {
      const offset = i - 3;
      const date = new Date(today);
      date.setDate(today.getDate() + offset);

      return {
        label: date
          .toLocaleDateString('en-US', { weekday: 'short' })
          .slice(0, 2),
        day: date.getDate(),
        isToday: offset === 0,
      };
    });
  }, []);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={days}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) =>
        item.isToday ? (
          <TouchableOpacity
            style={styles.iconWrapper}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <LinearGradient
              colors={['#FFFFFF', '#e6e6f3ff']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              <View style={[styles.dayItem, styles.activeDay]}>
                <Typography
                  weight="medium"
                  style={[styles.dayLabel, styles.activeText]}
                >
                  {item.label}
                </Typography>
                <Typography
                  weight="medium"
                  style={[styles.dayNumber, styles.activeText]}
                >
                  {item.day}
                </Typography>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.dayItem}>
            <Typography style={styles.dayLabel}>{item.label}</Typography>
            <Typography style={styles.dayNumber}>{item.day}</Typography>
          </View>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
  },
  list: {
    gap: 12,
    paddingBottom: 10,
  },
  dayItem: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconWrapper: {
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
  },
  activeDay: {
    paddingVertical: 3,
  },
  dayLabel: {
    fontSize: 10,
    opacity: 0.6,
    color: '#A7A7A7',
    transform: [{ translateY: 3 }],
  },
  dayNumber: {
    fontSize: 16,
    color: '#A7A7A7',
  },
  activeContentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  activeText: {
    color: '#000',
  },
});
