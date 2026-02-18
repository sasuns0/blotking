import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Round, Score } from '@/app/score';
import { Adds, Cards4 } from '@/constants/values';
import { RoundBadge } from '@/components/custom/round-badge';
import { AddButtons } from '@/components/custom/add-buttons';

interface FinishGameModalProps {
  visible: boolean;
  rounds: Score[];
  onClose: () => void;
  onRecordScore: (team1Score: string, team2Score: string) => void;
  onConfirmFinish: () => void;
}

type AddsType = {
  belote?: boolean;
  terz?: boolean;
  fifty?: boolean;
  hundred?: boolean;
  cards4?: {
    type: "9" | "10" | "j" | "q" | "k" | "a",
    value: number
  }
}

type TeamData = {
  score: string,
  adds: AddsType
}

type StateType = {
  team1: TeamData,
  team2: TeamData
}

const initialState: StateType = {
  team1: {
    score: "",
    adds: {}
  },
  team2: {
    score: "",
    adds: {}
  }
}

export function FinishGameModal({ visible, rounds, onClose, onRecordScore, onConfirmFinish }: FinishGameModalProps) {
  const [isAX2Selected, setIsAX2Selected] = useState(false);
  const [roundScore, setRoundScore] = useState(initialState);

  const currentRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;
  const roundInfo = currentRound?.round;

  const handleRecordScore = () => {
    // onRecordScore(team1Input, team2Input);
    setRoundScore(initialState)
    setIsAX2Selected(false)
  };

  const canRecord = roundScore.team1.score !== '' && roundScore.team2.score !== '';

  const updateScore = (team: "team1" | "team2", score: string) => {
    const newScoreState = team === "team1"
      ? {
        team1: { score, adds: roundScore.team1.adds }
      } : {
        team2: { score, adds: roundScore.team2.adds }
      }
    setRoundScore((prev) => ({ ...prev, newScoreState }))
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Round Badge with A X2 Button */}
          {roundInfo && (
            <View style={styles.roundBadgeContainer}>
              <RoundBadge round={roundInfo} />
              <Pressable
                onPress={() => setIsAX2Selected(prev => !prev)}
                style={({ pressed }) => [
                  styles.ax2Button,
                  isAX2Selected && styles.ax2ButtonSelected,
                  pressed && styles.ax2ButtonPressed,
                ]}
              >
                <Text style={styles.ax2ButtonText}>A X2</Text>
              </Pressable>
            </View>
          )}

          {/* Score Inputs */}
          <View style={styles.inputsContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Team 1 Score</Text>
              <TextInput
                style={styles.scoreInput}
                value={roundScore.team1.score}
                onChangeText={(value) => updateScore("team1", value)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#4B5563"
                maxLength={3}
              />
              {/* Cards4 Dropdown for Team 1 */}
              <View style={styles.dropdownContainer}>
                <Pressable
                  onPress={() => setShowTeam1Dropdown(!showTeam1Dropdown)}
                  style={styles.dropdownButton}
                >
                  <Text style={styles.dropdownButtonText}>
                    {team1Card ? Cards4.find(c => c.value === team1Card)?.name : 'Select Card'}
                  </Text>
                  <Text style={styles.dropdownArrow}>{showTeam1Dropdown ? '▲' : '▼'}</Text>
                </Pressable>
                {showTeam1Dropdown && (
                  <View style={styles.dropdownMenu}>
                    {Cards4.map((card) => (
                      <Pressable
                        key={card.name}
                        onPress={() => {
                          // setTeam1Card(card.value);
                          setShowTeam1Dropdown(false);
                        }}
                        style={({ pressed }) => [
                          styles.dropdownItem,
                          team1Card === card.value && styles.dropdownItemSelected,
                          pressed && styles.dropdownItemPressed,
                        ]}
                      >
                        <Text style={[styles.dropdownItemText, team1Card === card.value && styles.dropdownItemTextSelected]}>
                          {card.name} ({card.value})
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
              {/* Add Buttons */}
              <AddButtons />
            </View>
            <View style={styles.vsDivider}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Team 2 Score</Text>
              <TextInput
                style={styles.scoreInput}
                value={roundScore.team2.score}
                onChangeText={(value) => updateScore("team2", value)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#4B5563"
                maxLength={3}
              />
              {/* Cards4 Dropdown for Team 2 */}
              <View style={styles.dropdownContainer}>
                <Pressable
                  onPress={() => setShowTeam2Dropdown(!showTeam2Dropdown)}
                  style={styles.dropdownButton}
                >
                  <Text style={styles.dropdownButtonText}>
                    {team2Card ? Cards4.find(c => c.value === team2Card)?.name : 'Select Card'}
                  </Text>
                  <Text style={styles.dropdownArrow}>{showTeam2Dropdown ? '▲' : '▼'}</Text>
                </Pressable>
                {showTeam2Dropdown && (
                  <View style={styles.dropdownMenu}>
                    {Cards4.map((card) => (
                      <Pressable
                        key={card.name}
                        onPress={() => {
                          setTeam2Card(card.value);
                          setShowTeam2Dropdown(false);
                        }}
                        style={({ pressed }) => [
                          styles.dropdownItem,
                          team2Card === card.value && styles.dropdownItemSelected,
                          pressed && styles.dropdownItemPressed,
                        ]}
                      >
                        <Text style={[styles.dropdownItemText, team2Card === card.value && styles.dropdownItemTextSelected]}>
                          {card.name} ({card.value})
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
              {/* Add Buttons */}
              <AddButtons />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.actionButton,
                styles.cancelButton,
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleRecordScore}
              disabled={!canRecord}
              style={({ pressed }) => [
                styles.actionButton,
                styles.recordButton,
                !canRecord && styles.recordButtonDisabled,
                pressed && canRecord && styles.actionButtonPressed,
              ]}
            >
              <Text style={[styles.recordButtonText, !canRecord && styles.recordButtonTextDisabled]}>
                Record Score
              </Text>
            </Pressable>
          </View>

          {/* Finish Game Option */}
          {rounds.length > 0 && rounds[rounds.length - 1].team1 !== '' && (
            <Pressable
              onPress={onConfirmFinish}
              style={({ pressed }) => [
                styles.finishGameButton,
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Text style={styles.finishGameText}>End Game & View Results</Text>
            </Pressable>
          )}
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
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2B5A42',
    alignItems: 'center',
    minWidth: 320,
    maxWidth: 360,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  // Round Badge Styles (same as score page)
  roundBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  ax2Button: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ax2ButtonSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  ax2ButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  ax2ButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
    width: '100%',
    justifyContent: 'center',
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
  },
  inputLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  scoreInput: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 12,
    width: 80,
    height: 56,
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  // Cards4 Dropdown Styles
  dropdownContainer: {
    position: 'relative',
    width: 100,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownButtonText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  dropdownArrow: {
    color: '#9CA3AF',
    fontSize: 10,
    marginLeft: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2B5A42',
  },
  dropdownItemSelected: {
    backgroundColor: '#1E3A2B',
  },
  dropdownItemPressed: {
    backgroundColor: '#2B5A42',
  },
  dropdownItemText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  dropdownItemTextSelected: {
    color: '#4ADE80',
  },
  vsDivider: {
    paddingTop: 28,
  },
  vsText: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '700',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
  },
  cancelButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  recordButton: {
    backgroundColor: '#2B5A42',
  },
  recordButtonDisabled: {
    backgroundColor: '#1E3A2B',
    opacity: 0.5,
  },
  recordButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  recordButtonTextDisabled: {
    color: '#6B7280',
  },
  finishGameButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishGameText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
  actionButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
