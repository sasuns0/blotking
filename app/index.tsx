import { Button, Platform, Pressable, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome BlotKing</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>New Game</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Blot Rules</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    width: '100%',
  },
  button: {
    backgroundColor: "#1E3A2B",
    borderColor: "#2B5A42",
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 64,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#F8FAFC",
    fontSize: 20,
    textAlign: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
