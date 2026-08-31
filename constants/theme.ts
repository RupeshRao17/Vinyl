// Design tokens — mirrors the Tailwind config from the Sketch export.
// Keeping every screen's colors/type pulled from here means switching
// palettes later (e.g. to the dark "Spotlight" theme) is a one-file change.

export const colors = {
  onPrimary: '#ffffff',
  tertiaryFixedDim: '#cbc6bc',
  surfaceContainerLow: '#f6f3ed',
  surfaceVariant: '#e5e2dc',
  surfaceTint: '#ab3514',
  inverseSurface: '#31312d',
  onError: '#ffffff',
  primaryFixedDim: '#ffb5a1',
  surfaceDim: '#dcdad4',
  secondaryContainer: '#e6deda',
  onTertiaryFixedVariant: '#49473f',
  secondaryFixed: '#e9e1dd',
  outline: '#8c716a',
  onTertiaryFixed: '#1d1c15',
  onTertiaryContainer: '#f5f0e5',
  surface: '#fcf9f3',
  secondary: '#635d5b',
  outlineVariant: '#e0bfb7',
  surfaceContainer: '#f0eee8',
  onTertiary: '#ffffff',
  surfaceBright: '#fcf9f3',
  surfaceContainerHighest: '#e5e2dc',
  errorContainer: '#ffdad6',
  surfaceContainerLowest: '#ffffff',
  onBackground: '#1c1c18',
  onSecondary: '#ffffff',
  inversePrimary: '#ffb5a1',
  onSecondaryContainer: '#67615f',
  tertiaryFixed: '#e7e2d7',
  onPrimaryFixedVariant: '#881f00',
  primary: '#9d2b09',
  tertiaryContainer: '#706d64',
  error: '#ba1a1a',
  onPrimaryFixed: '#3c0800',
  inverseOnSurface: '#f3f0ea',
  onPrimaryContainer: '#ffece7',
  onSurfaceVariant: '#59413b',
  onErrorContainer: '#93000a',
  onSurface: '#1c1c18',
  onSecondaryFixed: '#1e1b19',
  secondaryFixedDim: '#cdc5c2',
  primaryFixed: '#ffdbd1',
  background: '#fcf9f3',
  tertiary: '#57554c',
  surfaceContainerHigh: '#ebe8e2',
  onSecondaryFixedVariant: '#4b4643',
  primaryContainer: '#bf4321',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  gutter: 20,
  marginMobile: 16,
} as const;

export const radius = {
  default: 2,
  lg: 4,
  xl: 8,
  full: 12,
} as const;

// Font family strings must match whatever names you load via
// @expo-google-fonts (see note at the bottom of DiaryScreen.tsx).
export const fonts = {
  displayBold: 'Fraunces_700Bold',
  displaySemiBold: 'Fraunces_600SemiBold',
  body: 'Manrope_400Regular',
  data: 'IBMPlexMono_400Regular',
  dataMedium: 'IBMPlexMono_500Medium',
} as const;

export const typography = {
  displayLgMobile: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  headlineMd: {
    fontFamily: fonts.displaySemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
  },
  dataMd: {
    fontFamily: fonts.data,
    fontSize: 14,
    lineHeight: 20,
  },
  labelSm: {
    fontFamily: fonts.dataMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  },
} as const;
