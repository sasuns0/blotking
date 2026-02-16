import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StartGameModal } from '@/components/start-game-modal';

export const SUITS = [
  { symbol: '♠', name: 'Spades', color: '#F8FAFC', value: "ace" },
  { symbol: '♥', name: 'Hearts', color: '#EF4444', value: "heart" },
  { symbol: '♣', name: 'Clubs', color: '#F8FAFC', value: "club" },
  { symbol: '♦', name: 'Diamonds', color: '#EF4444', value: "diamond" },
  { symbol: 'A', name: 'Ace', color: '#F8FAFC', value: "ace" },
];


const INITIAL_ROUNDS = [
  { round: '', team1: '', team2: '' },
];

export type Round = {
  suite: "ace" | "club" | "heart" | "diamond" | "ace",
  number: number,
  isQuanshed: boolean,
  isSured: boolean
}

export default function ScoreScreen() {
  const [rounds, setRounds] = useState(INITIAL_ROUNDS);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const onStart = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftButtonContainer}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
        </View>
        <ThemedText type="title" style={styles.title}>
          Score
        </ThemedText>
        <View style={styles.rightButtonContainer}>
          <Pressable
            onPress={openModal}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </Pressable>
        </View>
      </View>

      <StartGameModal visible={modalVisible} onClose={closeModal} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.roundCell]}>Round</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>Team 1</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>Team 2</Text>
        </View>

        {/* Table Rows */}
        {rounds.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 !== 0 && styles.tableRowEven,
            ]}
          >
            <Text style={[styles.cell, styles.roundCell, styles.scoreCellNonEditable]}>
              {item.round}
            </Text>
            <Text style={[styles.cell, styles.scoreCell, styles.scoreCellNonEditable]}>
              {item.team1}
            </Text>
            <Text style={[styles.cell, styles.scoreCell, styles.scoreCellNonEditable]}>
              {item.team2}
            </Text>
          </View>
        ))}
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leftButtonContainer: {
    width: 80,
    alignItems: 'flex-start',
  },
  rightButtonContainer: {
    width: 80,
    alignItems: 'flex-end',
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
  startButton: {
    backgroundColor: '#2B5A42',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  startButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E3A2B',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2B5A42',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  tableRowEven: {
    backgroundColor: '#0F1F17',
  },
  cell: {
    color: '#F8FAFC',
    fontSize: 16,
  },
  roundCell: {
    flex: 1,
    textAlign: 'center',
  },
  scoreCell: {
    flex: 1.5,
    textAlign: 'center',
  },
  scoreInput: {
    backgroundColor: '#0F1F17',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2B5A42',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  scoreCellNonEditable: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    textAlign: 'center',
  },
});
