import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { HeroCard, IntroCards } from '../components';
import { useJournalStore } from '../store';
import { cards } from '../constants';

export const HomeScreen = () => {
  const { entry } = useJournalStore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeroCard entry={entry} />
      <IntroCards cards={cards} title="Start your day" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
});
