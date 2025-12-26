import { StyleSheet, View } from 'react-native';
import type { HeroCardProps, JournalEntry } from '../../../types';

import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Typography } from '../../ui/typography';
import { useNavigation } from '../../../hooks';

export const HeroCard = ({ entry }: HeroCardProps) => {
  const { navigate } = useNavigation();

  return (
    <Card>
      {entry ? (
        <ExistingEntry entry={entry} onPress={() => navigate('Journal')} />
      ) : (
        <EmptyPrompt onReflect={() => navigate('Journal')} />
      )}
    </Card>
  );
};

const ExistingEntry = ({
  entry,
  onPress,
}: {
  entry: JournalEntry;
  onPress: () => void;
}) => (
  <View style={styles.content}>
    <Typography weight="medium" style={styles.entryText}>
      {entry.text}
    </Typography>
    <Button title="Edit" onPress={onPress} />
  </View>
);

const EmptyPrompt = ({ onReflect }: { onReflect: () => void }) => (
  <View style={styles.content}>
    <Typography weight="medium" style={styles.promptTitle}>
      What&apos;s on your mind?
    </Typography>
    <Typography style={styles.promptSubtitle}>
      Your feelings deserve a little space today.
    </Typography>
    <Button onPress={onReflect} title="Reflect" />
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  entryText: {
    fontSize: 14,
  },
  promptTitle: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  promptSubtitle: {
    marginTop: 8,
  },
});
