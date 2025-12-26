import { View, StyleSheet } from 'react-native';

import { Typography } from '../../ui/typography';
import { ActivityCard } from '../../ui/activity-card';
import type { CardItem, IntroCardsProps } from '../../../types';

export const IntroCards = ({ cards, title }: IntroCardsProps) => (
  <>
    <Typography weight="medium" style={styles.sectionTitle}>
      {title}
    </Typography>
    <View>
      <View style={styles.dashedLine} />
      {cards.map(card => (
        <TimelineItem key={card.id} card={card} />
      ))}
    </View>
  </>
);

const TimelineItem = ({ card }: { card: CardItem }) => (
  <View style={styles.timelineRow}>
    <View style={styles.timelineDot} />
    <ActivityCard
      img={card.img}
      title={card.title}
      desc={card.desc}
      color={card.color}
      textColor={card.textColor}
      tags={card.tags}
      ttr={card.ttr}
      onPress={() => {}}
    />
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    marginVertical: 20,
  },

  dashedLine: {
    position: 'absolute',
    left: 10,
    right: 0,
    marginHorizontal: 'auto',
    top: '15%',
    bottom: '18%',
    borderLeftWidth: 1.5,
    borderColor: '#D1D1D1',
    borderStyle: 'dashed',
    zIndex: -1,
  },

  timelineRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 10,
  },

  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'orange',
    backgroundColor: 'white',
  },
});
