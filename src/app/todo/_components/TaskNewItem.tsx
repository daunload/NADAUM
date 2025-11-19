'use client'

import { useState } from 'react'

export default function TaskNewItem({
	onAddTask,
}: {
	onAddTask: (text: string) => void
}) {
	const [inputValue, setInputValue] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onAddTask(inputValue)
		setInputValue('')
	}

	return (
		<div className="p-8 pb-4">
			<form onSubmit={handleSubmit} className="relative group">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='"할 일"에 작업 추가하기, 「엔터키를」 눌러 보존합니다'
					className="w-full bg-bg-surface text-text-main placeholder-text-muted border-2 border-border-strong rounded-2xl py-4 pl-6 pr-16 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
				/>
				<button
					type="submit"
					disabled={!inputValue.trim()}
					className="absolute right-3 top-3 bottom-3 aspect-square bg-primary hover:opacity-90 disabled:bg-border-strong disabled:cursor-not-allowed text-text-inverse rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
			</form>
		</div>
	)
}
