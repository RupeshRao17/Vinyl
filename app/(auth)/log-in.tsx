import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { colors, radius, spacing, typography } from '../../constants/theme';

export default function LogInScreen() {
  const router = useRouter();
  const { logIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setError('');
    await logIn(email.trim(), password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to pick up where you left off.</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.secondary}
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={colors.secondary}
              secureTextEntry
              autoComplete="password"
            />
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={colors.onPrimaryContainer} />
          ) : (
            <Text style={styles.submitButtonText}>Log In</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.replace('/(auth)/sign-up')}>
          <Text style={styles.switchLink}>New here? Create an account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  backButton: { padding: spacing.marginMobile },
  content: { flex: 1, paddingHorizontal: spacing.xl, justifyContent: 'center', gap: spacing.lg },
  title: { ...typography.headlineMd, fontSize: 26, color: colors.onSurface },
  subtitle: { ...typography.bodyMd, color: colors.onSurfaceVariant, marginTop: -spacing.sm },
  form: { gap: spacing.md },
  field: { gap: spacing.xs },
  fieldLabel: { ...typography.labelSm, color: colors.secondary, textTransform: 'uppercase' },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    backgroundColor: colors.surfaceContainerLow,
    ...typography.dataMd,
    color: colors.onSurface,
  },
  error: { ...typography.dataMd, color: colors.error, fontSize: 13 },
  submitButton: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 16,
    borderRadius: radius.xl,
    alignItems: 'center',
  },
  submitButtonText: { ...typography.headlineMd, fontSize: 16, color: colors.onPrimaryContainer },
  switchLink: { ...typography.dataMd, color: colors.primary, textAlign: 'center' },
});
