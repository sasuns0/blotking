import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Adds, Cards4 } from '@/constants/values';
import { TeamData } from './finish-game-modal';

interface AddButtonsProps {
  teamScore: TeamData;
  updateAdd: (addKey: string) => void
}

export function AddButtons({ teamScore, updateAdd }: AddButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      {/* Cards4 Dropdown */}
      {/* <View style={styles.dropdownContainer}> */}
      {/*   <Pressable */}
      {/*     onPress={() => setShowDropdown(!showDropdown)} */}
      {/*     style={styles.dropdownButton} */}
      {/*   > */}
      {/*     <Text style={styles.dropdownButtonText}> */}
      {/*       {selectedCard ? Cards4.find(c => c.value === selectedCard)?.name : 'Select Card'} */}
      {/*     </Text> */}
      {/*     <Text style={styles.dropdownArrow}>{showDropdown ? '▲' : '▼'}</Text> */}
      {/*   </Pressable> */}
      {/*   {showDropdown && ( */}
      {/*     <View style={styles.dropdownMenu}> */}
      {/*       {Cards4.map((card) => ( */}
      {/*         <Pressable */}
      {/*           key={card.name} */}
      {/*           onPress={() => handleCardSelect(card.value)} */}
      {/*           style={({ pressed }) => [ */}
      {/*             styles.dropdownItem, */}
      {/*             selectedCard === card.value && styles.dropdownItemSelected, */}
      {/*             pressed && styles.dropdownItemPressed, */}
      {/*           ]} */}
      {/*         > */}
      {/*           <Text style={[styles.dropdownItemText, selectedCard === card.value && styles.dropdownItemTextSelected]}> */}
      {/*             {card.name} ({card.value}) */}
      {/*           </Text> */}
      {/*         </Pressable> */}
      {/*       ))} */}
      {/*     </View> */}
      {/*   )} */}
      {/* </View> */}

      {/* Add Buttons */}

      <View style={styles.addButtonsRow}>
        {Adds.map(add => (
          <Pressable
            key={add.key}
            onPress={() => updateAdd(add.key)}
            style={({ pressed }) => [
              styles.addButton,
              teamScore.adds.includes(add.key) && styles.addButtonSelected,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>{add.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
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
  addButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
    maxWidth: 120,
  },
  addButton: {
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 8,
    minWidth: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
