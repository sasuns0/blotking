import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StartGameModal } from '@/components/custom/start-game-modal';
import { FinishGameModal } from '@/components/custom/finish-game-modal';
import { RoundBadge } from '@/components/custom/round-badge';
import { SUITS } from '@/constants/values';
import { useTeamsStore } from '@/store/teamsStore';

export type SuitType = "spade" | "club" | "heart" | "diamond" | "ace";

export interface Suit {
  symbol: string;
  name: string;
  color: string;
  value: SuitType;
}

export type Score = {
  round: Round,
  team1: string,
  team2: string
}

export type Round = {
  suit: SuitType,
  number: number,
  isQuanshed: boolean,
  isSured: boolean,
  selectedTeam?: 'team1' | 'team2'
}

export default function ScoreScreen() {
  const [rounds, setRounds] = useState<Score[]>([]);
  const [isGameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openFinishModal = () => setFinishModalVisible(true);
  const closeFinishModal = () => setFinishModalVisible(false);

  const onScoreSubmit = (round: Round) => {
    setRounds([...rounds, { round, team1: '', team2: '' }])
    setGameStarted(true)
    closeModal()
  }

  const handleConfirmFinish = () => {
    setGameStarted(false);
    closeFinishModal();
  }

  const getSuiteByValue = (value: SuitType) => {
    return SUITS.find(item => item.value === value)?.symbol;
  }

  const onRecordScore = (team1Score: string, team2Score: string) => {
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      if (newRounds.length > 0) {
        newRounds[newRounds.length - 1] = {
          ...newRounds[newRounds.length - 1],
          team1: team1Score,
          team2: team2Score
        };
      }
      return newRounds;
    });
    closeFinishModal();
  }

  const { team1, team2 } = useTeamsStore();

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
          Հաշիվ
        </ThemedText>
        <View style={styles.rightButtonContainer}>
          <Pressable
            onPress={isGameStarted ? openFinishModal : openModal}
            style={({ pressed }) => [
              styles.startButton,
              isGameStarted && styles.finishButton,
              pressed && styles.startButtonPressed,
            ]}
          >
            <Text style={styles.startButtonText}>
              {isGameStarted ? 'Ավարտել' : 'Սկսել'}
            </Text>
          </Pressable>
        </View>
      </View>

      <StartGameModal visible={modalVisible} onScoreSubmit={onScoreSubmit} onClose={closeModal} />

      <FinishGameModal
        visible={finishModalVisible}
        rounds={rounds}
        onClose={closeFinishModal}
        onRecordScore={onRecordScore}
        onConfirmFinish={handleConfirmFinish}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.roundCell]}>Խոսացած</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>{team1.name}</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>{team2.name}</Text>
        </View>

        {/* Table Rows */}
        {rounds?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 !== 0 && styles.tableRowEven,
            ]}
          >
            <View style={[styles.roundCell, styles.roundCellContainer]}>
              <RoundBadge round={item.round} />
            </View>
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
  finishButton: {
    backgroundColor: '#EF4444',
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
  // Beautiful round cell styles
  roundCellContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 0,
  },
});
