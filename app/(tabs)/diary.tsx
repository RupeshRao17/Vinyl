import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { TopAppBar } from '../../components/TopAppBar';
import { DiaryEntryCard } from '../../components/DiaryEntryCard';
import { diaryEntries } from '../../data/mock';
import { colors, spacing, typography } from '../../constants/theme';

export default function DiaryScreen() {
  const router = useRouter();

  // Group consecutive entries by their date label for sticky section headers.
  const sections = useMemo(() => {
    const map = new Map<string, typeof diaryEntries>();
    for (const entry of diaryEntries) {
      const existing = map.get(entry.dateLabel) ?? [];
      existing.push(entry);
      map.set(entry.dateLabel, existing);
    }
    return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
  }, []);

  return (
    <View style={styles.screen}>
      <TopAppBar variant="home" onLeftPress={() => {}} onRightPress={() => router.push('/search')} />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.dateHeader}>{section.title}</Text>
        )}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.duration(300).delay(Math.min(index, 8) * 50)}>
            <DiaryEntryCard
              entry={item}
              onPress={() => router.push(`/album/${item.album.id}`)}
            />
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        SectionSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  listContent: { padding: spacing.marginMobile, paddingBottom: 100 },
  dateHeader: {
    ...typography.dataMd,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '80',
    paddingBottom: spacing.xs,
  },
});
