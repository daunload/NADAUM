import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
				<div className="relative">
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder='"할 일"에 작업 추가하기, 「엔터키를」 눌러 보존합니다'
						className="h-[60px] pl-6 pr-16 text-lg rounded-2xl shadow-sm border-2 border-border-strong focus:border-primary focus:shadow-[0_0_0_4px_rgba(231,162,110,0.1)]"
					/>
					<div className="absolute right-3 top-3 bottom-3">
						<Button
							type="submit"
							disabled={!inputValue.trim()}
							variant="primary"
							className="h-full aspect-square p-0 rounded-xl"
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
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
