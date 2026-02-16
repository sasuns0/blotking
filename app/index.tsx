import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  return (
    <View style={styles.centeredView}>
      <ThemedView style={styles.titleContainer}>
        {step === 0 ?
          <>
            <ThemedText type="title">Welcome BlotKing</ThemedText>
            <HelloWave />
          </>
          : <>
            <Pressable onPress={() => setStep(0)} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <ThemedText type="title" style={styles.selectTeamsTitle}>Select Teams</ThemedText>
          </>
        }
      </ThemedView>

      {
        step === 0 ?
          <ThemedView style={styles.buttonContainer}>
            <Pressable onPress={() => setStep(1)} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>New Score</Text>
            </Pressable>

            <Pressable onPress={() => router.push('/rules')} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>Blot Rules</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>Leaderboard</Text>
            </Pressable>
          </ThemedView>
          : <ThemedView style={styles.buttonContainer}>
            <TextInput
              placeholder="Team 1"
              placeholderTextColor="#9CA3AF"
              style={styles.teamInput}
              multiline={false}
            />
            <TextInput
              placeholder="Team 2"
              placeholderTextColor="#9CA3AF"
              style={styles.teamInput}
              multiline={false}
            />
            <Pressable onPress={() => router.push('/score')} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>Start Game</Text>
            </Pressable>
          </ThemedView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  selectTeamsTitle: {
    lineHeight: 36,
    includeFontPadding: false,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: "#F8FAFC",
    fontSize: 20,
    textAlign: 'center',
  },
  teamInput: {
    width: '90%',
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B5A42',
    backgroundColor: '#0F1F17',
    color: '#F8FAFC',
    fontSize: 18,
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
