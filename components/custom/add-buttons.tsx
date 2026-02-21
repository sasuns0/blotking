import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AddKey, Adds, Cards4 } from '@/constants/values';
import { TeamData } from './finish-game-modal';
import { AddCounterButton } from './add-counter-button';

interface AddButtonsProps {
  teamScore: TeamData;
  updateAdd: (addKey: AddKey, count: number) => void
  updateCards4: (addKey: string) => void
}

export function AddButtons({ teamScore, updateAdd, updateCards4 }: AddButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const addKeys = Object.keys(Adds) as AddKey[];

  let card4Names = "";
  teamScore.cards4.forEach(item => {
    card4Names += `${Cards4[item].name}, `
  })

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

        {/* Cards4 Dropdown */}
        <View style={styles.dropdownContainer}>
          <Pressable
            onPress={() => setShowDropdown(!showDropdown)}
            style={[
              styles.dropdownButton,
              teamScore.cards4.length > 0 && styles.addButtonSelected,
            ]}
          >
            <Text style={styles.dropdownButtonText}>
              {teamScore.cards4.length > 0 ? card4Names : '4 Թուղթ'}
            </Text>
          </Pressable>
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {Object.keys(Cards4).map((card) => (
                <Pressable
                  key={card}
                  onPress={() => updateCards4(card)}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    teamScore.cards4.includes(card) && styles.dropdownItemSelected,
                    pressed && styles.dropdownItemPressed,
                  ]}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    teamScore.cards4.includes(card) && styles.dropdownItemTextSelected,
                  ]}>
                    {Cards4[card].name} ({Cards4[card].value})
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
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
  dropdownContainer: {
    position: 'relative',
    width: 136,
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
