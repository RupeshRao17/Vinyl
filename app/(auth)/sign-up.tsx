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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      setError('Fill in your name, email, and a password of at least 6 characters.');
      return;
    }
    setError('');
    await signUp(name.trim(), email.trim(), password);
    // Root layout will redirect to (tabs) automatically once `user` is set.
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
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Start logging what you listen to.</Text>

        <View style={styles.form}>
          <Field label="Name" value={name} onChangeText={setName} autoComplete="name" />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password-new"
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={colors.onPrimaryContainer} />
          ) : (
            <Text style={styles.submitButtonText}>Sign Up</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.replace('/(auth)/log-in')}>
          <Text style={styles.switchLink}>Already have an account? Log in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function Field(props: React.ComponentProps<typeof TextInput> & { label: string }) {
  const { label, ...inputProps } = props;
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.secondary}
        {...inputProps}
      />
    </View>
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
  fieldLabel: {
    ...typography.labelSm,
    color: colors.secondary,
    textTransform: 'uppercase',
  },
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
  switchLink: {
    ...typography.dataMd,
    color: colors.primary,
    textAlign: 'center',
  },
});
