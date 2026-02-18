import { Pressable, Text, StyleSheet } from "react-native"

interface ActionButtonProps {
  onSubmit: () => void;
  text: string;
  type: "primary" | "outline" | "secondary";
  selected?: boolean;
  selectedStyle?: { borderColor: string, backgroundColor: string }
}

export const ActionButton = ({ onSubmit, text, type, selected, selectedStyle }: ActionButtonProps) => {
  let buttonStyle;

  switch (type) {
    case "primary":
      buttonStyle = styles.actionButtonPrimary;
      break;
    case "outline":
      buttonStyle = styles.actionButtonOutline;
      break;
    case "secondary":
      buttonStyle = styles.actionButtonSecondary;
      break;
    default:
      buttonStyle = styles.actionButtonPrimary;
  }

  return (
    <Pressable
      onPress={onSubmit}
      style={({ pressed }) => [
        styles.actionButton,
        buttonStyle,
        selected && selectedStyle,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <Text style={styles.actionButtonTextPrimary}>{text}</Text>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  actionButton: {
    width: 120,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2B5A42',
  },
  actionButtonSecondary: {
    backgroundColor: '#0F1F17',
    borderWidth: 2,
    borderColor: '#2B5A42',
  },
  actionButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  actionButtonPrimary: {
    backgroundColor: '#2B5A42',
  },
  actionButtonTextPrimary: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
})
