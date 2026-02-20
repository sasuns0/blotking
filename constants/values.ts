import { Suit } from "@/app/score";

export const SUITS: Suit[] = [
  { symbol: '♠', name: 'Spades', color: '#F8FAFC', value: "spade" },
  { symbol: '♥', name: 'Hearts', color: '#EF4444', value: "heart" },
  { symbol: '♣', name: 'Clubs', color: '#F8FAFC', value: "club" },
  { symbol: '♦', name: 'Diamonds', color: '#EF4444', value: "diamond" },
  { symbol: 'A', name: 'Ace', color: '#F8FAFC', value: "ace" },
];

export const Cards4 = [
  { value: "14", name: "9" },
  { value: "20", name: "J" },
  { value: "10", name: "Q" },
  { value: "10", name: "K" },
  { value: "10", name: "A" },
]

export const Adds = [
  {
    name: "Բլոտ",
    key: "blote",
    value: "2"
  },
  {
    name: "Թերզ",
    key: "terz",
    value: "2",
  },
  {
    name: "50",
    key: "fifty",
    value: "5",
  },
  {
    name: "100",
    key: "hundred",
    value: "10"
  },
]
