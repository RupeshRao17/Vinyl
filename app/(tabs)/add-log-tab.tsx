import React from 'react';
import { View } from 'react-native';

// Never rendered — _layout.tsx intercepts tabPress on this tab and
// navigates to the /add-log modal route instead. This file only needs
// to exist so Expo Router has a valid screen to attach the tab to.
export default function AddLogTabPlaceholder() {
  return <View />;
}
