import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Props = {
  variant?: 'home' | 'detail';
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: IconName;
};

export function TopAppBar({ variant = 'home', onLeftPress, onRightPress, rightIcon }: Props) {
  return (
    <View style={styles.header}>
      <Pressable hitSlop={8} onPress={onLeftPress} style={styles.iconButton}>
        <MaterialIcons
          name={variant === 'home' ? 'menu' : 'arrow-back'}
          size={24}
          color={colors.onSurfaceVariant}
        />
      </Pressable>
      <Text style={styles.title}>VINYL</Text>
      <Pressable hitSlop={8} onPress={onRightPress} style={styles.iconButton}>
        <MaterialIcons
          name={rightIcon ?? (variant === 'home' ? 'search' : 'more-vert')}
          size={24}
          color={colors.onSurfaceVariant}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.sm,
    height: 64,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d', // ~30% opacity
  },
  iconButton: { padding: spacing.sm },
  title: {
    ...typography.displayLgMobile,
    fontSize: 22,
    color: colors.primary,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
});
