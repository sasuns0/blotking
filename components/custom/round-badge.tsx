import { StyleSheet, Text, View } from 'react-native';
import { Round, Suit } from '@/app/score';
import { SUITS } from '@/constants/values';

interface RoundBadgeProps {
  round: Round;
}

export function RoundBadge({ round }: RoundBadgeProps) {
  const getSuiteByValue = (value: string) => {
    return SUITS.find((item: Suit) => item.value === value)?.symbol;
  };

  return (
    <View style={styles.roundBadge}>
      <Text style={styles.roundNumber}>{round.number}</Text>
      <Text style={[styles.roundSuit, { color: SUITS.find(s => s.value === round.suit)?.color || '#F8FAFC' }]}>
        {getSuiteByValue(round.suit)}
      </Text>
      {(round.isQuanshed || round.isSured) && (
        <View style={[
          styles.modifierBadge,
          round.isQuanshed && styles.quanshBadge,
          round.isSured && styles.surBadge
        ]}>
          <Text style={styles.modifierText}>
            {round.isQuanshed ? 'Ք' : 'Ս'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  roundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#2B5A42',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    flexShrink: 1,
    maxWidth: 100,
    overflow: 'hidden',
  },
  roundNumber: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  roundSuit: {
    fontSize: 16,
    fontWeight: '600',
  },
  modifierBadge: {
    backgroundColor: '#2B5A42',
    borderRadius: 8,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quanshBadge: {
    backgroundColor: '#EF4444',
  },
  surBadge: {
    backgroundColor: '#F59E0B',
  },
  modifierText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
  },
});
