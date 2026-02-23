import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface RoundActionTooltipProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  roundIndex: number;
}

export const RoundActionTooltip = ({ visible, onClose, onDelete, roundIndex }: RoundActionTooltipProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.tooltipOverlay} onPress={onClose}>
        <View style={styles.tooltipContent}>
          <Text style={styles.tooltipTitle}>
            ռաունդ {roundIndex + 1}
          </Text>
          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [
              styles.tooltipDeleteButton,
              pressed && styles.tooltipDeleteButtonPressed,
            ]}
          >
            <Text style={styles.tooltipDeleteButtonText}>Ջնջել</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  tooltipOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipContent: {
    backgroundColor: '#1E3A2B',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2B5A42',
    alignItems: 'center',
    minWidth: 200,
  },
  tooltipTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tooltipDeleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DC2626',
    minWidth: 120,
    alignItems: 'center',
  },
  tooltipDeleteButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  tooltipDeleteButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
