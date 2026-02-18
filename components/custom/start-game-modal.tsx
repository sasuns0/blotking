import { Round, SuitType } from '@/app/score';
import { SUITS } from '@/constants/values';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../ui/action-button';
import { Stepper } from '../ui/stepper';

interface StartGameModalProps {
  visible: boolean;
  onClose: () => void;
  onScoreSubmit: (round: Round) => void;
}

export function StartGameModal({ visible, onClose, onScoreSubmit }: StartGameModalProps) {
  const [selectedSuit, setSelectedSuit] = useState<SuitType | null>(null);
  const [roundNumber, setRoundNumber] = useState(8);
  const [isQuanshSelected, setIsQuanshSelected] = useState(false);
  const [isSurSelected, setIsSurSelected] = useState(false);

  const handleSuitSelect = (suitName: SuitType) => {
    setSelectedSuit(suitName);
  };

  const handleQuanshSelect = () => {
    setIsQuanshSelected((prev) => {
      if (prev) {
        return false;
      } else {
        setIsSurSelected(false);
        return true;
      }
    });
  };

  const handleSurSelect = () => {
    setIsSurSelected((prev) => {
      if (prev) {
        return false;
      } else {
        setIsQuanshSelected(false);
        return true;
      }
    });
  };

  const handleClose = () => {
    setSelectedSuit(null);
    setIsQuanshSelected(false);
    setIsSurSelected(false);
    setRoundNumber(8);
    onClose();
  };

  const handleStartGame = () => {
    if (!selectedSuit) {
      return
    }

    onScoreSubmit({
      suit: selectedSuit,
      number: roundNumber,
      isQuanshed: isQuanshSelected,
      isSured: isSurSelected
    })
  }

  const incrementRound = () => setRoundNumber((prev) => prev + 1);
  const decrementRound = () => setRoundNumber((prev) => (prev > 8 ? prev - 1 : 8));

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

            {/* Suit Selection */}
            <View style={styles.section}>
              <View style={styles.suitsGrid}>
                {SUITS.map((suit) => (
                  <Pressable
                    key={suit.value}
                    onPress={() => handleSuitSelect(suit.value)}
                    style={({ pressed }) => [
                      styles.suitCard,
                      selectedSuit === suit.value && styles.suitCardSelected,
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
              <Stepper decrement={decrementRound} increment={incrementRound} number={roundNumber} />
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionButtonsRow}>
              <ActionButton
                text="Քուանշ"
                type="secondary"
                onSubmit={handleQuanshSelect}
                selected={isQuanshSelected}
                selectedStyle={styles.actionButtonSelectedRed}
              />
              <ActionButton
                text="Սուր"
                type="secondary"
                onSubmit={handleSurSelect}
                selected={isSurSelected}
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
});
