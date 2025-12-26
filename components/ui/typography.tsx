import type { ReactNode } from 'react';
import { Text, type TextProps } from 'react-native';

import type { FontWeight } from '../../types/fonts.type';
import { fonts } from '../../constants/theme.const';

interface TypographyProps extends TextProps {
  weight?: FontWeight;
  children: ReactNode;
}

export const Typography = ({
  weight = 'regular',
  style,
  children,
  ...rest
}: TypographyProps) => (
  <Text style={[{ fontFamily: fonts[weight] }, style]} {...rest}>
    {children}
  </Text>
);
