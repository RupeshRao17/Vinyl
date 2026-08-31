import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, typography } from '../../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.brandBlock}>
        <Text style={styles.logo}>VINYL</Text>
        <Text style={styles.tagline}>Log every record. Rate every spin.</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(500).delay(150)} style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={styles.primaryButtonText}>Create an account</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.push('/(auth)/log-in')}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingBottom: spacing.xl * 1.5,
    paddingTop: spacing.xl * 2,
  },
  brandBlock: { alignItems: 'center', marginTop: spacing.xl * 2 },
  logo: {
    ...typography.displayLgMobile,
    fontSize: 44,
    color: colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  actions: { gap: spacing.sm },
  primaryButton: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 16,
    borderRadius: radius.xl,
    alignItems: 'center',
  },
  primaryButtonText: { ...typography.headlineMd, fontSize: 16, color: colors.onPrimaryContainer },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
  secondaryButtonText: { ...typography.bodyMd, color: colors.onSurfaceVariant },
});
