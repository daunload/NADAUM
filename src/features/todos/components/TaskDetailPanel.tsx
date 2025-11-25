'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EmotionSelector from '@/features/emotion/components/EmotionSelector'
import { Emotion } from '@/features/emotion/types'
import { useEffect, useState } from 'react'
import { Todo, UpdateTodoRequest } from '../types'
import TaskToggle from './TaskToggle'

interface TaskDetailPanelProps {
	todo: Todo | null
	onClose: () => void
	onUpdate: (id: string, updates: UpdateTodoRequest) => void
	onDelete: (id: string) => void
	onToggle: (taskId: string, isCompleted: boolean) => void
}

export default function TaskDetailPanel({
	todo,
	onClose,
	onUpdate,
	onDelete,
	onToggle,
}: TaskDetailPanelProps) {
	const [title, setTitle] = useState('')
	const [review, setReview] = useState('')
	const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([])

	useEffect(() => {
		if (todo) {
			setTitle(todo.title)
			setReview(todo.review || '')
			setSelectedEmotions(todo.emotions || [])
		}
	}, [todo])

	const handleSave = () => {
		const task = {
			title: title.trim() === '' ? undefined : title,
			review: review.trim() === '' ? undefined : review,
			emotions: selectedEmotions,
		}

		if (todo) onUpdate(todo.id, task)
	}

	const handleEmotionSelect = (emotionValue: Emotion) => {
		let _selectedEmotions = [...selectedEmotions, emotionValue]
		if (selectedEmotions.includes(emotionValue))
			_selectedEmotions = selectedEmotions.filter(
				(emotion) => emotion !== emotionValue,
			)

		setSelectedEmotions(_selectedEmotions)
	}

	const handleDelete = () => {
		if (todo && confirm('정말 삭제하시겠습니까?')) {
			onDelete(todo.id)
			onClose()
		}
	}

	if (!todo) return null

	return (
		<>
			{/* Panel */}
			<div className="h-full w-full max-w-md flex p-8 pl-0 max-h-[800px]">
				<div className=" bg-bg-surface w-full h-full flex flex-col rounded-[20px] border border-border-soft">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-border-soft gap-2">
						<TaskToggle
							active={todo.completed}
							onClick={(e) => {
								e.stopPropagation()
								onToggle(todo.id, todo.completed)
							}}
						></TaskToggle>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onBlur={handleSave}
							placeholder="할 일을 입력하세요"
						/>
						<button
							onClick={onClose}
							className="p-2 hover:bg-bg-page rounded-lg transition-colors"
							aria-label="Close panel"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
						{todo.completed && (
							<>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<label className="text-sm font-medium text-text-primary">
											리뷰
										</label>
										<span className="text-xs text-text-tertiary">
											{review.length} / 500
										</span>
									</div>
									<textarea
										value={review}
										onChange={(e) =>
											setReview(e.target.value)
										}
										placeholder="이 태스크에 대한 리뷰를 작성해보세요."
										maxLength={500}
										className="w-full min-h-[200px] p-3 rounded-lg border border-border-soft bg-bg-page text-text-primary placeholder:text-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
									/>
								</div>
								<div className="space-y-3">
									<label className="text-sm font-medium text-text-secondary">
										감정
									</label>
									<EmotionSelector
										onSelectEmotion={handleEmotionSelect}
										selectedEmotions={selectedEmotions}
									/>
								</div>
							</>
						)}
					</div>

					{/* Footer */}
					<div className="p-4 border-t border-border-soft">
						<Button
							onClick={handleSave}
							variant="secondary"
							fullWidth
							className="bg-primary/10 text-primary border-transparent hover:bg-primary/20 hover:text-primary"
						>
							저장하기
						</Button>
						<Button
							onClick={handleDelete}
							variant="secondary"
							fullWidth
							className="bg-error/10 text-error border-transparent hover:bg-error/20 hover:text-error"
						>
							삭제하기
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
