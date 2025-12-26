import type { Navigation } from '../types';
import { useNavigation as useNativeNavigation } from '@react-navigation/native';

export const useNavigation = () => {
  const router = useNativeNavigation<Navigation>();

  return router;
};
