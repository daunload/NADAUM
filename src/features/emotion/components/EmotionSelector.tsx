import { EMOTIONS } from '../constants/emotion'
import { Emotion } from '../types'

export default function EmotionSelector({
	onSelectEmotion,
	selectedEmotions,
}: {
	onSelectEmotion: (emotion: Emotion) => void
	selectedEmotions: Emotion[]
}) {
	return (
		<div className="flex flex-wrap gap-2 mt-2">
			{EMOTIONS.map((emotion) => (
				<button
					key={emotion.value}
					onClick={() => onSelectEmotion(emotion.value)}
					className={`
                        px-2 py-1 rounded-full text-sm font-medium transition-all
                        flex items-center gap-1.5
                        ${
							selectedEmotions.includes(emotion.value)
								? 'bg-primary/20 text-primary border-2 border-primary'
								: 'bg-bg-page text-text-secondary border-2 border-border-soft hover:border-primary/30 hover:bg-primary/5'
						}
                    `}
				>
					<span className="text-base">{emotion.emoji}</span>
					<span>{emotion.label}</span>
				</button>
			))}
		</div>
	)
}
