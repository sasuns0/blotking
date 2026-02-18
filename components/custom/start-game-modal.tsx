import { Round, SuitType } from '@/app/score';
import { SUITS } from '@/constants/values';
import { useTeamsStore } from '@/store/teamsStore';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../ui/action-button';
import { Stepper } from '../ui/stepper';

interface StartGameModalProps {
  visible: boolean;
  onClose: () => void;
  onScoreSubmit: (round: Round) => void;
}

type ScoreState = {
  selectedSuit?: SuitType;
  roundNumber: number;
  isQuanshSelected: boolean;
  isSurSelected: boolean;
  selectedTeam?: "team1" | "team2";
}

const initialFormState = {
  selectedSuit: undefined,
  roundNumber: 8,
  isQuanshSelected: false,
  isSurSelected: false,
  selectedTeam: undefined
}

export function StartGameModal({ visible, onClose, onScoreSubmit }: StartGameModalProps) {
  const [score, setScore] = useState<ScoreState>(initialFormState);
  const { team1, team2 } = useTeamsStore();

  const handleSuitSelect = (suitName: SuitType) => {
    setScore({ ...score, selectedSuit: suitName })
  };

  const handleTeamSelect = (teamId: 'team1' | 'team2') => {
    setScore({ ...score, selectedTeam: teamId })
  };

  const handleQuanshSelect = () => {
    setScore((prev) => ({
      ...prev,
      isQuanshSelected: !prev.isQuanshSelected,
      isSurSelected: !prev.isQuanshSelected ? false : prev.isSurSelected
    }))
  };

  const handleSurSelect = () => {
    setScore((prev) => ({
      ...prev,
      isQuanshSelected: !score.isSurSelected ? false : prev.isQuanshSelected,
      isSurSelected: !score.isSurSelected
    }))
  };

  const handleClose = () => {
    setScore(initialFormState);
    onClose();
  };

  const handleStartGame = () => {
    if (!score.selectedSuit || !score.selectedTeam) {
      return
    }

    onScoreSubmit({
      suit: score.selectedSuit,
      number: score.roundNumber,
      isQuanshed: score.isQuanshSelected,
      isSured: score.isSurSelected,
      selectedTeam: score.selectedTeam
    })
  }

  const incrementRound = () => setScore((prev) => ({ ...prev, roundNumber: prev.roundNumber + 1 }));
  const decrementRound = () => setScore((prev) => ({ ...prev, roundNumber: prev.roundNumber <= 8 ? 8 : prev.roundNumber - 1 }));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Որոշեք խաղը</Text>
            </View>

            {/* Team Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Ընտրեք թիմը</Text>
              <View style={styles.teamsContainer}>
                <Pressable
                  onPress={() => handleTeamSelect('team1')}
                  style={({ pressed }) => [
                    styles.teamButton,
                    score.selectedTeam === 'team1' && styles.teamButtonSelected,
                    pressed && styles.teamButtonPressed,
                  ]}
                >
                  <Text style={styles.teamButtonText}>{team1.name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleTeamSelect('team2')}
                  style={({ pressed }) => [
                    styles.teamButton,
                    score.selectedTeam === 'team2' && styles.teamButtonSelected,
                    pressed && styles.teamButtonPressed,
                  ]}
                >
                  <Text style={styles.teamButtonText}>{team2.name}</Text>
                </Pressable>
              </View>
            </View>

            {/* Suit Selection */}
            <View style={styles.section}>
              <View style={styles.suitsGrid}>
                {SUITS.map((suit) => (
                  <Pressable
                    key={suit.value}
                    onPress={() => handleSuitSelect(suit.value)}
                    style={({ pressed }) => [
                      styles.suitCard,
                      score.selectedSuit === suit.value && styles.suitCardSelected,
                      pressed && styles.suitCardPressed,
                    ]}
                  >
                    <Text style={[styles.suitCardSymbol, { color: suit.color }]}>
                      {suit.symbol}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Number Stepper Section */}
            <View style={styles.section}>
              <Stepper decrement={decrementRound} increment={incrementRound} number={score.roundNumber} />
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionButtonsRow}>
              <ActionButton
                text="Քուանշ"
                type="secondary"
                onSubmit={handleQuanshSelect}
                selected={score.isQuanshSelected}
                selectedStyle={styles.actionButtonSelectedRed}
              />
              <ActionButton
                text="Սուր"
                type="secondary"
                onSubmit={handleSurSelect}
                selected={score.isSurSelected}
                selectedStyle={styles.actionButtonSelectedRed}
              />
            </View>

            {/* Main Action Buttons */}
            <View style={styles.mainActionsRow}>
              <ActionButton
                onSubmit={handleClose}
                text="Չեղարկել"
                type="outline"
              />
              <ActionButton
                onSubmit={handleStartGame}
                text="Սկսել"
                type="primary"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#1E3A2B',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2B5A42',
    alignItems: 'center',
    minWidth: 250,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '600',
  },
  modalText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 20,
  },
  // New layout styles
  modalContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  suitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  suitCard: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
  },
  suitCardSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  suitCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  suitCardSymbol: {
    fontSize: 28,
    fontWeight: '600',
  },
  // Keep old styles for compatibility
  suitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    maxWidth: 280,
  },
  suitButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  suitButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  suitSymbol: {
    fontSize: 32,
  },
  selectedSuitBadge: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  selectedSuitText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  actionButtonSelectedRed: {
    borderColor: '#EF4444',
    backgroundColor: '#3D1F1F',
  },
  mainActionsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // Team Selection Styles
  teamsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  teamButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  teamButtonSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  teamButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  teamButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
