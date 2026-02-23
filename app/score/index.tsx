import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StartGameModal } from '@/components/custom/start-game-modal';
import { FinishGameModal } from '@/components/custom/finish-game-modal';
import { QuitConfirmationModal } from '@/components/custom/quit-confirmation-modal';
import { RoundActionTooltip } from '@/components/custom/round-action-tooltip';
import { RoundBadge } from '@/components/custom/round-badge';
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

export type TeamType = "team1" | "team2"

export type Round = {
  suit: SuitType,
  number: number,
  isQuanshed: boolean,
  isSured: boolean,
  selectedTeam?: TeamType
}

export default function ScoreScreen() {
  const [rounds, setRounds] = useState<Score[]>([]);
  const [isGameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState(false);
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedRoundIndex, setSelectedRoundIndex] = useState<number | null>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openFinishModal = () => setFinishModalVisible(true);
  const closeFinishModal = () => setFinishModalVisible(false);
  const openQuitModal = () => setQuitModalVisible(true);
  const closeQuitModal = () => setQuitModalVisible(false);
  const openTooltip = (index: number) => {
    setSelectedRoundIndex(index);
    setTooltipVisible(true);
  };
  const closeTooltip = () => {
    setTooltipVisible(false);
    setSelectedRoundIndex(null);
  };
  const deleteRound = () => {
    if (selectedRoundIndex !== null) {
      setRounds(prevRounds => prevRounds.filter((_, i) => i !== selectedRoundIndex));
      closeTooltip();
    }
  };

  const onScoreSubmit = (round: Round) => {
    setRounds([...rounds, { round, team1: '', team2: '' }])
    setGameStarted(true)
    closeModal()
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
    setGameStarted(false);
  }

  const { team1, team2 } = useTeamsStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftButtonContainer}>
          <Pressable
            onPress={openQuitModal}
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
              {isGameStarted ? 'Գրել' : 'Սկսել'}
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
      />

      <QuitConfirmationModal visible={quitModalVisible} onClose={closeQuitModal} />

      <RoundActionTooltip
        visible={tooltipVisible}
        onClose={closeTooltip}
        onDelete={deleteRound}
        roundIndex={selectedRoundIndex ?? 0}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Grid Header */}
        <View style={styles.gridHeader}>
          <Text style={styles.gridHeaderCell}>Խոսացած</Text>
          <Text style={styles.gridHeaderCell}>{team1.name}</Text>
          <Text style={styles.gridHeaderCell}>{team2.name}</Text>
        </View>

        {/* Grid Rows */}
        {rounds?.map((item, index) => {
          const isRoundCompleted = item.team1 !== '' && item.team2 !== '';
          return (
            <Pressable
              key={index}
              onPress={() => isRoundCompleted && openTooltip(index)}
              style={({ pressed }) => [
                styles.gridRow,
                index % 2 !== 0 && styles.gridRowEven,
                isRoundCompleted && pressed && styles.gridRowPressed,
              ]}
            >
              <View style={styles.gridCell}>
                <RoundBadge round={item.round} />
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellText}>{item.team1}</Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellText}>{item.team2}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Final Score Footer - Sticky Bottom */}
      {rounds.length > 0 && (
        <View style={styles.finalScoreContainer}>
          <View style={styles.finalScoreRow}>
            <View style={styles.finalScoreItem}>
              <Text style={styles.finalScoreLabel}>{team1.name}</Text>
              <Text style={styles.finalScoreValue}>
                {rounds.reduce((sum, round) => sum + (parseInt(round.team1) || 0), 0)}
              </Text>
            </View>
            <View style={styles.finalScoreDivider}>
              <Text style={styles.finalScoreVs}>VS</Text>
            </View>
            <View style={styles.finalScoreItem}>
              <Text style={styles.finalScoreLabel}>{team2.name}</Text>
              <Text style={styles.finalScoreValue}>
                {rounds.reduce((sum, round) => sum + (parseInt(round.team2) || 0), 0)}
              </Text>
            </View>
          </View>
        </View>
      )}
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
    lineHeight: 32,
    fontSize: 20,
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
    fontSize: 12,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // Grid Styles
  gridHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E3A2B',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  gridHeaderCell: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2B5A42',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  gridRowEven: {
    backgroundColor: '#0F1F17',
  },
  gridCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCellText: {
    color: '#F8FAFC',
    fontSize: 16,
    textAlign: 'center',
  },
  // Final Score Footer Styles - Matching app UI/UX
  finalScoreContainer: {
    backgroundColor: '#1E3A2B',
    borderTopWidth: 1,
    borderTopColor: '#2B5A42',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  finalScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  finalScoreItem: {
    alignItems: 'center',
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
  },
  finalScoreLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  finalScoreValue: {
    color: '#4ADE80',
    fontSize: 24,
    fontWeight: '700',
  },
  finalScoreDivider: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalScoreVs: {
    color: '#2B5A42',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 20,
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 34,
  },
  // Grid row pressed state
  gridRowPressed: {
    backgroundColor: 'rgba(43, 90, 66, 0.3)',
  },
});
