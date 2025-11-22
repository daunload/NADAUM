'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
	onToggle
}: TaskDetailPanelProps) {
	const [title, setTitle] = useState('')

	useEffect(() => {
		if (todo) {
			setTitle(todo.title)
		}
	}, [todo])

	const handleSave = () => {
		if (todo && title.trim() !== todo.title) {
			onUpdate(todo.id, { title: title.trim() })
		}
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
			<div className="h-full w-full max-w-md flex p-8 pl-0">
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

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
					</div>

					{/* Footer */}
					<div className="p-6 border-t border-border-soft">
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
