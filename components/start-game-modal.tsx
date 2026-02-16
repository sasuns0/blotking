import { Round, SUITS } from '@/app/score';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface StartGameModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (round: Round) => void;
}

export function StartGameModal({ visible, onClose, onStart }: StartGameModalProps) {
  const [selectedSuit, setSelectedSuit] = useState<string | null>(null);
  const [number, setNumber] = useState(8);
  const [isQuanshSelected, setIsQuanshSelected] = useState(false);
  const [isSurSelected, setIsSurSelected] = useState(false);

  const handleSuitSelect = (suitName: string) => {
    setSelectedSuit(suitName);
  };

  const handleQuanshSelect = () => {
    setIsQuanshSelected((prev) => !prev);
  };

  const handleSurSelect = () => {
    setIsSurSelected((prev) => !prev);
  };

  const handleClose = () => {
    setSelectedSuit(null);
    setIsQuanshSelected(false);
    setIsSurSelected(false);
    setNumber(8);
    onClose();
  };

  const handleStartGame = () => {
    onStart({
      suit: "ace",
      number,
      isQuanshed: isQuanshSelected,
      isSured: isSurSelected
    })
  }

  const increment = () => setNumber((prev) => prev + 1);
  const decrement = () => setNumber((prev) => (prev > 8 ? prev - 1 : 8));

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
              <Text style={styles.modalTitle}>Configure Game</Text>
              {selectedSuit && (
                <View style={styles.selectedSuitBadge}>
                  <Text style={styles.selectedSuitText}>{selectedSuit}</Text>
                </View>
              )}
            </View>

            {/* Suit Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Select Suit</Text>
              <View style={styles.suitsGrid}>
                {SUITS.map((suit) => (
                  <Pressable
                    key={suit.name}
                    onPress={() => handleSuitSelect(suit.name)}
                    style={({ pressed }) => [
                      styles.suitCard,
                      selectedSuit === suit.name && styles.suitCardSelected,
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
              <Text style={styles.sectionLabel}>Rounds</Text>
              <View style={styles.numberStepper}>
                <Pressable
                  onPress={decrement}
                  style={({ pressed }) => [
                    styles.stepperButton,
                    styles.stepperButtonLeft,
                    pressed && styles.stepperButtonPressed,
                  ]}
                >
                  <Text style={styles.stepperButtonText}>−</Text>
                </Pressable>
                <View style={styles.numberValueContainer}>
                  <Text style={styles.numberValue}>{number}</Text>
                </View>
                <Pressable
                  onPress={increment}
                  style={({ pressed }) => [
                    styles.stepperButton,
                    styles.stepperButtonRight,
                    pressed && styles.stepperButtonPressed,
                  ]}
                >
                  <Text style={styles.stepperButtonText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionButtonsRow}>
              <Pressable
                onPress={handleQuanshSelect}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.actionButtonSecondary,
                  isQuanshSelected && styles.actionButtonSelectedRed,
                  pressed && styles.actionButtonPressed,
                ]}
              >
                <Text style={styles.actionButtonText}>Quansh</Text>
              </Pressable>
              <Pressable
                onPress={handleSurSelect}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.actionButtonSecondary,
                  isSurSelected && styles.actionButtonSelectedRed,
                  pressed && styles.actionButtonPressed,
                ]}
              >
                <Text style={styles.actionButtonText}>Sur</Text>
              </Pressable>
            </View>

            {/* Main Action Buttons */}
            <View style={styles.mainActionsRow}>
              <Pressable
                onPress={handleClose}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.actionButtonOutline,
                  pressed && styles.actionButtonPressed,
                ]}
              >
                <Text style={styles.actionButtonTextOutline}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleStartGame}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.actionButtonPrimary,
                  pressed && styles.actionButtonPressed,
                ]}
              >
                <Text style={styles.actionButtonTextPrimary}>Start Game</Text>
              </Pressable>
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
  numberStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2B5A42',
  },
  stepperButton: {
    backgroundColor: '#0F1F17',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonLeft: {
    borderRightWidth: 1,
    borderRightColor: '#2B5A42',
  },
  stepperButtonRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#2B5A42',
  },
  stepperButtonPressed: {
    backgroundColor: '#1E3A2B',
  },
  stepperButtonText: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '600',
  },
  numberValueContainer: {
    backgroundColor: '#0F1F17',
    minWidth: 80,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  numberValue: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  actionButton: {
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
  },
  actionButtonSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  actionButtonSelectedRed: {
    borderColor: '#EF4444',
    backgroundColor: '#3D1F1F',
  },
  actionButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  actionButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  mainActionsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2B5A42',
  },
  actionButtonTextOutline: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtonPrimary: {
    backgroundColor: '#2B5A42',
  },
  actionButtonTextPrimary: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
});
