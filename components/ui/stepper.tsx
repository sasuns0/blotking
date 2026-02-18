import { View, Pressable, Text, StyleSheet } from "react-native"

interface StepperProps {
  decrement: () => void;
  increment: () => void;
  number: number;
}

export const Stepper = ({ decrement, increment, number }: StepperProps) => {
  return (
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
  )
}

const styles = StyleSheet.create({
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
})
