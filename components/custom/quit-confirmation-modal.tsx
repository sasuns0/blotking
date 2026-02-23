import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

interface QuitConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const QuitConfirmationModal = ({ visible, onClose }: QuitConfirmationModalProps) => {
  const handleQuit = () => {
    onClose();
    router.back();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Հաստատեք դուրս գալը</Text>
          <Text style={styles.modalMessage}>Ցանկանում եք դուրս գալ խաղից?</Text>
          <View style={styles.modalButtons}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.modalButton,
                styles.modalButtonCancel,
                pressed && styles.modalButtonPressed,
              ]}
            >
              <Text style={styles.modalButtonCancelText}>Մնալ</Text>
            </Pressable>
            <Pressable
              onPress={handleQuit}
              style={({ pressed }) => [
                styles.modalButton,
                styles.modalButtonConfirm,
                pressed && styles.modalButtonPressed,
              ]}
            >
              <Text style={styles.modalButtonConfirmText}>Դուրս գալ</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    minWidth: 280,
    maxWidth: 320,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
  },
  modalButtonConfirm: {
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#DC2626',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  modalButtonCancelText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtonConfirmText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
