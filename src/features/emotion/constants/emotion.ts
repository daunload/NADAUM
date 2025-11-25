import { Emotion } from '../types'

export const EMOTIONS: { emoji: string; label: string; value: Emotion }[] = [
	{ emoji: '😊', label: '기쁨', value: 'joy' },
	{ emoji: '😐', label: '무난함', value: 'neutral' },
	{ emoji: '😞', label: '슬픔', value: 'sad' },
	{ emoji: '😤', label: '스트레스', value: 'stress' },
	{ emoji: '😩', label: '피곤함', value: 'tired' },
	{ emoji: '😰', label: '불안', value: 'anxious' },
	{ emoji: '😡', label: '짜증', value: 'annoyed' },
	{ emoji: '✨', label: '성취감', value: 'achievement' },
] as const
