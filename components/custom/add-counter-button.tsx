import { AddKey, Adds, Cards4 } from '@/constants/values';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface AddCounterButtonProps {
  addKey: AddKey;
  updateAdd: (addKey: AddKey, count: number) => void;
  adds: Partial<Record<AddKey, number>>
}

export const AddCounterButton = ({ addKey, updateAdd, adds }: AddCounterButtonProps) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleAddUpdate = (count: number) => {
    updateAdd(addKey, count);
    setShowDropdown(false);
  }

  return (
    <View key={addKey} style={styles.addButtonWrapper}>
      <Pressable
        onPress={() => addKey === "blote"
          ? handleAddUpdate(1)
          : adds[addKey]
            ? updateAdd(addKey, 1)
            : setShowDropdown(!showDropdown)
        }
        style={({ pressed }) => [
          styles.addButton,
          adds[addKey] !== undefined && styles.addButtonSelected,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>
          {adds[addKey] && adds[addKey] > 1
            ? `${Adds[addKey].name}(${adds[addKey]})`
            : `${Adds[addKey].name}`
          }
        </Text>
      </Pressable>
      {showDropdown && (<View style={styles.dropdownMenu}>
        {[1, 2, 3].map((count) => (
          <Pressable
            key={count}
            onPress={() => handleAddUpdate(count)}
            style={({ pressed }) => [
              styles.dropdownItem,
              pressed && styles.dropdownItemPressed,
            ]}
          >
            <Text style={[styles.dropdownItemText]}>
              {count}
            </Text>
          </Pressable>
        ))}
      </View>)}
    </View >

  )
}

const styles = StyleSheet.create({
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
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  addButtonSelected: {
    borderColor: '#4ADE80',
    backgroundColor: '#1E3A2B',
  },
  addButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
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
    padding: 8,
  },
  dropdownItemText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  dropdownItemPressed: {
    backgroundColor: '#2B5A42',
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2B5A42',
  },
})
