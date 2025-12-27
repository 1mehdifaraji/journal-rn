import type { PropsWithChildren } from 'react';
import type { Navigation } from './navigation.type';
import type { ViewStyle } from 'react-native';

type HeaderVariants = 'primary' | 'secondary';

export interface HeaderProps {
  title?: string;
  variant?: HeaderVariants;
  onPress?: () => void;
}

export type SecondaryHeaderProps = Pick<Navigation, 'canGoBack' | 'goBack'> & {
  date: string;
  onPress?: () => void;
};

export type PrimaryHeaderProps = Pick<Navigation, 'navigate'> & {
  title: string;
};

export type ContainerProps = PropsWithChildren & { style?: ViewStyle };

export interface Tag {
  id: number;
  title: string;
}

export interface ActivityCardProps {
  title: string;
  desc: string;
  img: any;
  onPress: () => void;
  color: string;
  tags: Tag[];
  ttr: number;
  textColor: string;
}

export interface CardHeaderProps {
  img: any;
  title: string;
  desc: string;
}

export interface CardFooterProps {
  tags: Tag[];
  color: string;
  ttr: number;
  textColor: string;
}

export interface TagItemProps {
  title: string;
  color: string;
}

export interface JournalEntry {
  text: string;
  createdAt: string;
}

export interface CardItem {
  id: string | number;
  title: string;
  desc: string;
  img: any;
  color: string;
  tags: { id: number; title: string }[];
  ttr: number;
  textColor: string;
}

export interface IntroCardsProps {
  cards: CardItem[];
  title: string;
}

export interface HeroCardProps {
  entry: JournalEntry | null;
}

export interface VoiceRecordModalProps {
  visible: boolean;
  onClose: () => void;
  onPress?: () => void;
  style?: ViewStyle;
  isListening: boolean;
}

export interface DayItem {
  label: string;
  day: number;
  isToday: boolean;
}
