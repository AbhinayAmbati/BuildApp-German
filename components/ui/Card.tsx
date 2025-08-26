import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { BorderRadius, Spacing, Shadows } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  shadow?: keyof typeof Shadows;
  borderRadius?: keyof typeof BorderRadius;
}

export function Card({
  children,
  style,
  padding = 'md',
  shadow = 'light',
  borderRadius = 'md',
}: CardProps) {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: BorderRadius[borderRadius],
    padding: Spacing[padding],
    ...Shadows[shadow],
    shadowColor: colors.shadow,
  };

  return <View style={[cardStyle, style]}>{children}</View>;
}

interface ProfileCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ProfileCard({ children, style }: ProfileCardProps) {
  const { colors } = useTheme();

  const profileCardStyle: ViewStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
    shadowColor: colors.shadow,
    overflow: 'hidden',
  };

  return <View style={[profileCardStyle, style]}>{children}</View>;
}

interface SwipeCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function SwipeCard({ children, style }: SwipeCardProps) {
  const { colors } = useTheme();

  const swipeCardStyle: ViewStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: BorderRadius.xl,
    ...Shadows.heavy,
    shadowColor: colors.shadow,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  };

  return <View style={[swipeCardStyle, style]}>{children}</View>;
}
