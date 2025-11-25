'use client'

import { KeyboardEvent, useState } from 'react'

interface TagInputProps {
	tags: string[]
	availableTags: string[]
	onAddTag: (tag: string) => void
	onRemoveTag: (tag: string) => void
}

export default function TagInput({
	tags,
	availableTags,
	onAddTag,
	onRemoveTag,
}: TagInputProps) {
	const [input, setInput] = useState('')
	const [showSuggestions, setShowSuggestions] = useState(false)

	const suggestions = availableTags.filter(
		(tag) =>
			tag.toLowerCase().includes(input.toLowerCase()) &&
			!tags.includes(tag),
	)

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && input.trim()) {
			e.preventDefault()
			onAddTag(input.trim())
			setInput('')
			setShowSuggestions(false)
		}
	}

	return (
		<div className="space-y-3">
			<label className="text-sm font-medium text-text-primary">
				태그
			</label>

			{/* 선택된 태그들 */}
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/20"
						>
							#{tag}
							<button
								onClick={() => onRemoveTag(tag)}
								className="hover:text-accent/70 ml-1"
								aria-label={`Remove ${tag} tag`}
							>
								×
							</button>
						</span>
					))}
				</div>
			)}

			{/* 입력 필드 */}
			<div className="relative">
				<input
					type="text"
					value={input}
					onChange={(e) => {
						setInput(e.target.value)
						setShowSuggestions(e.target.value.length > 0)
					}}
					onKeyDown={handleKeyDown}
					onBlur={() =>
						setTimeout(() => setShowSuggestions(false), 200)
					}
					placeholder="태그 입력 후 Enter"
					className="w-full px-3 py-2 rounded-lg border border-border-soft bg-bg-page text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
				/>

				{/* 자동완성 제안 */}
				{showSuggestions && suggestions.length > 0 && (
					<div className="absolute z-10 w-full mt-1 bg-bg-surface border border-border-soft rounded-lg shadow-lg max-h-40 overflow-y-auto">
						{suggestions.map((tag) => (
							<button
								key={tag}
								onClick={() => {
									onAddTag(tag)
									setInput('')
									setShowSuggestions(false)
								}}
								className="w-full px-3 py-2 text-left hover:bg-bg-page text-text-main text-sm transition-colors"
							>
								#{tag}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
