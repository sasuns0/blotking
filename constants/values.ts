import { Suit } from "@/app/score";

export const SUITS: Suit[] = [
  { symbol: '♠', name: 'Spades', color: '#F8FAFC', value: "spade" },
  { symbol: '♥', name: 'Hearts', color: '#EF4444', value: "heart" },
  { symbol: '♣', name: 'Clubs', color: '#F8FAFC', value: "club" },
  { symbol: '♦', name: 'Diamonds', color: '#EF4444', value: "diamond" },
  { symbol: 'A', name: 'Ace', color: '#F8FAFC', value: "ace" },
];

export type AddKey = "blote" | "terz" | "fifty" | "hundred"

export const Adds: Record<AddKey, { name: string, value: number }> = {
  "blote": {
    name: "Բլոտ",
    value: 2
  },
  "terz": {
    name: "Թերզ",
    value: 2,
  },
  "fifty": {
    name: "50",
    value: 5,
  },
  "hundred": {
    name: "100",
    value: 10
  },
}
