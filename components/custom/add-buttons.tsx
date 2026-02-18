import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Adds } from '@/constants/values';

interface AddButtonsProps {
  onSelectionChange?: (selectedValues: string[]) => void;
  initialSelected?: string[];
}

export function AddButtons({ onSelectionChange, initialSelected = [] }: AddButtonsProps) {
  const [selectedAdds, setSelectedAdds] = useState<string[]>(initialSelected);

  const toggleAdd = (value: string) => {
    setSelectedAdds(prev => {
      const newSelection = prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value];
      
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  return (
    <View style={styles.addButtonsRow}>
      {Adds.map((add) => (
        <Pressable
          key={add.name}
          onPress={() => toggleAdd(add.value)}
          style={({ pressed }) => [
            styles.addButton,
            selectedAdds.includes(add.value) && styles.addButtonSelected,
            pressed && styles.addButtonPressed,
          ]}
        >
          <Text style={styles.addButtonText}>{add.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
