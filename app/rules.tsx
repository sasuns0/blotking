import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function RulesScreen() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const readFile = async () => {
      try {
        const { localUri } = await Asset.fromModule(require('../assets/rules.txt')).downloadAsync();

        if (localUri) {
          const file = new File(localUri);
          const content = await file.text();

          setFileContent(content);
        }

      } catch (err) {
        console.error("Error reading file:", err);
      }
    };

    readFile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <ThemedText type="title" style={styles.title}>Blot Rules</ThemedText>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.rulesText}>
          {fileContent}
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2B5A42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  backButtonText: {
    color: '#F8FAFC',
    fontSize: 20,
    lineHeight: 22,
  },
  title: {
    marginBottom: 0,
    lineHeight: 36,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  rulesText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
