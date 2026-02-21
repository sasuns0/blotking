import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Round, Score } from '@/app/score';
import { RoundBadge } from '@/components/custom/round-badge';
import { AddButtons } from '@/components/custom/add-buttons';
import { useTeamsStore } from '@/store/teamsStore';
import { AddKey } from '@/constants/values';
import { calculateStore } from '@/utils/calculateScore';

interface FinishGameModalProps {
  visible: boolean;
  rounds: Score[];
  onClose: () => void;
  onRecordScore: (team1Score: string, team2Score: string) => void;
}

export type TeamData = {
  score: string,
  adds: Partial<Record<AddKey, number>>,
  cards4: string[]
}

export function FinishGameModal({ visible, rounds, onClose, onRecordScore }: FinishGameModalProps) {
  const [isAX2Selected, setIsAX2Selected] = useState(false);
  const [team1Score, setTeam1Score] = useState<TeamData>({ score: "", adds: {}, cards4: [] });
  const [team2Score, setTeam2Score] = useState<TeamData>({ score: "", adds: {}, cards4: [] });

  const team1 = useTeamsStore(store => store.team1);
  const team2 = useTeamsStore(store => store.team2);

  const currentRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;
  const roundInfo = currentRound?.round;

  const handleRecordScore = () => {
    setIsAX2Selected(false)

    if (!currentRound) {
      return
    }

    let team1FinalScore = calculateStore(team1Score, currentRound, "team1").toString();
    let team2FinalScore = calculateStore(team2Score, currentRound, "team2").toString();

    setTeam1Score({ score: "", adds: {}, cards4: [] })
    setTeam2Score({ score: "", adds: {}, cards4: [] })

    onRecordScore(team1FinalScore, team2FinalScore)
  };

  const canRecord = team1Score.score !== '' && team2Score.score !== '';

  const updateScore = (team: "team1" | "team2", score: string) => {
    if (team === "team1") {
      setTeam1Score({ ...team1Score, score })
    } else {
      setTeam2Score({ ...team2Score, score })
    }
  }

  const updateAdd = (team: "team1" | "team2", addKey: AddKey, count: number) => {
    if (team === "team1") {
      if (!team1Score.adds[addKey]) {
        setTeam1Score({ ...team1Score, adds: { ...team1Score.adds, [addKey]: count } })
      } else {
        const team1Adds = team1Score.adds;
        delete team1Adds[addKey];
        setTeam1Score({ ...team1Score, adds: team1Adds })
      }
    } else {
      if (!team2Score.adds[addKey]) {
        setTeam2Score({ ...team2Score, adds: { ...team2Score.adds, [addKey]: count } })
      } else {
        const team2Adds = team2Score.adds;
        delete team2Adds[addKey];
        setTeam2Score({ ...team2Score, adds: team2Adds })
      }
    }
  }

  const updateCards4 = (team: "team1" | "team2", addKey: string) => {
    if (team === "team1") {
      if (!team1Score.cards4.includes(addKey)) {
        setTeam1Score({ ...team1Score, cards4: [...team1Score.cards4, addKey] })
      } else {
        setTeam1Score({ ...team1Score, cards4: team1Score.cards4.filter(item => item !== addKey) })
      }
    } else {
      if (!team2Score.cards4.includes(addKey)) {
        setTeam2Score({ ...team2Score, cards4: [...team2Score.cards4, addKey] })
      } else {
        setTeam2Score({ ...team2Score, cards4: team2Score.cards4.filter(item => item !== addKey) })
      }
    }
  }

  const handleClose = () => {
    setTeam1Score({ score: "", adds: {}, cards4: [] })
    setTeam2Score({ score: "", adds: {}, cards4: [] })

    onClose()
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Selected Team Display */}
          {roundInfo?.selectedTeam && (
            <View style={styles.selectedTeamContainer}>
              <Text style={styles.selectedTeamLabel}>Խաղացող թիմ</Text>
              <Text style={styles.selectedTeamName}>
                {roundInfo.selectedTeam === 'team1' ? team1.name : team2.name}
              </Text>
            </View>
          )}

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
              <Text style={styles.inputLabel}>{team1.name} Տարած</Text>
              <TextInput
                style={styles.scoreInput}
                value={team1Score.score}
                onChangeText={(value) => updateScore("team1", value)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#4B5563"
                maxLength={3}
              />
              <AddButtons teamScore={team1Score} updateAdd={(adds, count) => updateAdd("team1", adds, count)} updateCards4={(addKey) => updateCards4("team1", addKey)} />
            </View>
            <View style={styles.vsDivider}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{team2.name} Տարած</Text>
              <TextInput
                style={styles.scoreInput}
                value={team2Score.score}
                onChangeText={(value) => updateScore("team2", value)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#4B5563"
                maxLength={3}
              />
              <AddButtons teamScore={team2Score} updateAdd={(adds, count) => updateAdd("team2", adds, count)} updateCards4={(addKey) => updateCards4("team2", addKey)} />
            </View>
          </View>

          {/* Action Buttons Row - Aligned with input groups */}
          <View style={styles.bottomButtonsRow}>
            <Pressable
              onPress={handleClose}
              style={({ pressed }) => [
                styles.bottomButton,
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
                styles.bottomButton,
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
  bottomButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
  },
  bottomButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTeamContainer: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#4ADE80',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedTeamLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedTeamName: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '700',
  },
});
