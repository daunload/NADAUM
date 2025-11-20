'use client'

import { useEffect, useState } from 'react'
import { Todo, UpdateTodoRequest } from '../types'

interface TaskDetailPanelProps {
	todo: Todo | null
	onClose: () => void
	onUpdate: (id: string, updates: UpdateTodoRequest) => void
	onDelete: (id: string) => void
}

export default function TaskDetailPanel({
	todo,
	onClose,
	onUpdate,
	onDelete,
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
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/20 z-40 transition-opacity"
				onClick={onClose}
			/>

			{/* Panel */}
			<div className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-surface shadow-2xl z-50 flex flex-col animate-slide-in">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-border-soft">
					<h2 className="text-xl font-semibold text-text-main">
						Task Details
					</h2>
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
					{/* Status */}
					<div className="flex items-center gap-3">
						<div
							className={`px-3 py-1 rounded-full text-sm font-medium ${
								todo.completed
									? 'bg-accent/10 text-accent'
									: 'bg-border-soft text-text-muted'
							}`}
						>
							{todo.completed ? '완료됨' : '진행 중'}
						</div>
					</div>

					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-text-main mb-2">
							제목
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onBlur={handleSave}
							className="w-full px-4 py-3 bg-bg-page border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-text-main"
							placeholder="할 일을 입력하세요"
						/>
					</div>

					{/* Created At */}
					<div>
						<label className="block text-sm font-medium text-text-main mb-2">
							생성일
						</label>
						<p className="text-text-muted">
							{new Date(todo.createdAt).toLocaleString('ko-KR')}
						</p>
					</div>

					{/* Updated At */}
					{todo.updatedAt && (
						<div>
							<label className="block text-sm font-medium text-text-main mb-2">
								수정일
							</label>
							<p className="text-text-muted">
								{new Date(todo.updatedAt).toLocaleString(
									'ko-KR',
								)}
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-border-soft">
					<button
						onClick={handleDelete}
						className="w-full px-4 py-3 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors font-medium"
					>
						삭제하기
					</button>
				</div>
			</div>
		</>
	)
}
