import { Adds } from '@/constants/values';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const AddCounter = () => {
  return (
    <View key={key} style={styles.addButtonWrapper}>
      <Pressable
        onPress={() => updateAdd(key)}
        style={({ pressed }) => [
          styles.addButton,
          teamScore.adds.includes(key) && styles.addButtonSelected,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>{Adds[key].name}</Text>
      </Pressable>
    </View>

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
})
