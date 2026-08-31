import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLow,
          borderTopColor: colors.outlineVariant,
        },
        tabBarLabelStyle: { fontFamily: fonts.dataMedium, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diary',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="auto-stories" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-log-tab"
        options={{
          title: 'Add Log',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" size={size} color={color} />
          ),
        }}
        // "Add Log" isn't a real screen in the tab stack — it opens the
        // /add-log modal route instead. Intercepting tabPress is the
        // standard Expo Router pattern for a middle "action" tab.
        listeners={({ navigation }) => ({
          // `e` is typed as non-cancellable here due to an Expo Router
          // typed-routes inference quirk on custom tab names; tabPress is
          // cancellable at runtime (see @react-navigation/bottom-tabs).
          tabPress: (e) => {
            (e as unknown as { preventDefault: () => void }).preventDefault();
            navigation.getParent()?.navigate('add-log');
          },
        })}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
