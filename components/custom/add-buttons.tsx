import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AddKey, Adds } from '@/constants/values';
import { TeamData } from './finish-game-modal';
import { AddCounterButton } from './add-counter-button';

interface AddButtonsProps {
  teamScore: TeamData;
  updateAdd: (addKey: AddKey, count: number) => void
  updateCards4: (val: string) => void
}

export function AddButtons({ teamScore, updateAdd, updateCards4 }: AddButtonsProps) {
  const addKeys = Object.keys(Adds) as AddKey[];

  return (
    <View style={styles.container}>
      {/* Add Buttons */}
      <View style={styles.addButtonsRow}>
        {addKeys.map((key) => (
          <AddCounterButton
            key={key}
            addKey={key}
            updateAdd={updateAdd}
            adds={teamScore.adds}
          />
        ))}

        {/* Cards4 Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={teamScore.cards4}
            onChangeText={updateCards4}
            style={styles.textInput}
            placeholder="4 Թուղթ"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: 136,
    height: 44,
  },
  textInput: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 8,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  addButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    width: 136,
  },
  addButtonWrapper: {
    width: 64,
    height: 44,
  },
  addButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 8,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  addButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
