import LinearGradient from 'react-native-linear-gradient';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Typography } from './typography';
import type {
  ActivityCardProps,
  CardFooterProps,
  CardHeaderProps,
  TagItemProps,
} from '../../types';

export const ActivityCard = ({
  title,
  desc,
  img,
  onPress,
  color,
  tags,
  ttr,
  textColor,
}: ActivityCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, styles.card]}
    >
      <LinearGradient
        colors={['#FFFFFF', color]}
        start={{ x: 0.7, y: 1 }}
        end={{ x: 0.6, y: 0.2 }}
      >
        <View style={styles.content}>
          <CardHeader img={img} title={title} desc={desc} />
          <View>
            <CardFooter
              tags={tags}
              color={color}
              ttr={ttr}
              textColor={textColor}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const CardHeader = ({ img, title, desc }: CardHeaderProps) => (
  <View style={styles.headerRow}>
    <Image source={img} style={styles.image} resizeMode="cover" />
    <View style={styles.textContent}>
      <Typography
        numberOfLines={1}
        ellipsizeMode="tail"
        weight="medium"
        style={styles.title}
      >
        {title}
      </Typography>
      <Typography
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.description}
      >
        {desc}
      </Typography>
    </View>
  </View>
);

const CardFooter = ({ tags, color, ttr, textColor }: CardFooterProps) => (
  <View style={styles.footerRow}>
    <View style={styles.tagsContainer}>
      {tags.map(tag => (
        <TagItem key={tag.id} title={tag.title} color={color} />
      ))}
    </View>
    <Typography weight="bold" style={[styles.timeText, { color: textColor }]}>
      {ttr} min
    </Typography>
  </View>
);

const TagItem = ({ title, color }: TagItemProps) => (
  <View style={styles.tagGradient}>
    <LinearGradient
      colors={['#FFFFFF', color]}
      start={{ x: 0.7, y: 1 }}
      end={{ x: 0.7, y: 0 }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      >
        <Typography style={styles.tagText}>{title}</Typography>
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#00000039',
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 15,
  },
  image: {
    width: 64,
    height: 64,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 12,
    opacity: 0.9,
    marginVertical: 8,
    letterSpacing: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tagGradient: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  tagText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 11,
  },
});
