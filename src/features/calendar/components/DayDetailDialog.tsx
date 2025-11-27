'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { EMOTIONS } from '@/features/emotion/constants/emotion'
import { Emotion } from '@/features/emotion/types'
import { Todo } from '@/features/todos/types'
import { useEffect, useState } from 'react'

interface EmotionListProps {
	emotions: Emotion[]
}

function EmotionList({ emotions }: EmotionListProps) {
	if (!emotions || emotions.length === 0) return null

	return (
		<div className="flex gap-1 mt-2">
			{emotions.map((emotion) => (
				<span
					key={emotion}
					title={EMOTIONS.find((e) => e.value === emotion)?.label}
				>
					{EMOTIONS.find((e) => e.value === emotion)?.emoji}
				</span>
			))}
		</div>
	)
}

interface TaskItemProps {
	task: Todo
}

function TaskItem({ task }: TaskItemProps) {
	return (
		<div className="p-4 border border-border-soft rounded-lg bg-bg-surface hover:bg-bg-subtle/30 transition-colors">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1">
					<h3
						className={`font-medium ${
							task.completed
								? 'line-through text-text-sub'
								: 'text-text-main'
						}`}
					>
						{task.title}
					</h3>
					<p className="text-xs text-text-sub mt-1">
						{new Date(task.createdAt).toLocaleTimeString('ko-KR', {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</p>
					{task.review && (
						<p className="text-sm text-text-sub mt-2 bg-bg-subtle/50 p-2 rounded">
							{task.review}
						</p>
					)}
					<EmotionList emotions={task.emotions} />
				</div>
				{task.completed && (
					<span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
						완료
					</span>
				)}
			</div>
		</div>
	)
}

interface DayDetailDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	day: number
	year: number
	month: number
	tasks: Todo[]
	originRect?: DOMRect | null
}

export function DayDetailDialog({
	open,
	onOpenChange,
	day,
	year,
	month,
	tasks,
	originRect,
}: DayDetailDialogProps) {
	const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>(
		{},
	)

	useEffect(() => {
		if (open && originRect) {
			const centerX = window.innerWidth / 2
			const centerY = window.innerHeight / 2

			const originCenterX = originRect.left + originRect.width / 2
			const originCenterY = originRect.top + originRect.height / 2

			const translateX = originCenterX - centerX
			const translateY = originCenterY - centerY

			const scaleX = originRect.width / 672
			const scaleY = originRect.height / 400

			setAnimationStyle({
				transform: `translate(${translateX}px, ${translateY}px) scale(${Math.min(scaleX, scaleY)})`,
				opacity: 0,
				transition: 'none',
			})

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setAnimationStyle({
						transform: 'translate(0, 0) scale(1)',
						opacity: 1,
						transition: 'all 0.6s ease-in-out',
					})
				})
			})
		} else if (!open) {
			setAnimationStyle({})
		}
	}, [open, originRect])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-2xl max-h-[80vh] overflow-y-auto"
				style={animationStyle}
			>
				<DialogHeader>
					<DialogTitle>
						{year}년 {month}월 {day}일
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					{tasks.length === 0 ? (
						<p className="text-text-sub text-center py-8">
							등록된 할 일이 없습니다.
						</p>
					) : (
						<div className="space-y-2">
							<p className="text-sm text-text-sub mb-4">
								총 {tasks.length}개의 할 일
							</p>
							{tasks.map((task) => (
								<TaskItem key={task.id} task={task} />
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
