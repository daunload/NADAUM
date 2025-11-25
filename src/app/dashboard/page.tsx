'use client'

import { EMOTIONS } from '@/features/emotion/constants/emotion'
import { Emotion } from '@/features/emotion/types'
import { useTodayTasks } from '@/features/todos/hooks'
import { useMemo } from 'react'

export default function DashboardPage() {
	const { data: todos } = useTodayTasks()

	const stats = useMemo(() => {
		if (!todos) return null

		const total = todos.length
		const completed = todos.filter((t) => t.completed).length
		const pending = total - completed
		const completionRate =
			total > 0 ? Math.round((completed / total) * 100) : 0

		// 감정 분석
		const emotionCounts: Record<string, number> = {}
		todos.forEach((todo) => {
			if (todo.completed && todo.emotions) {
				todo.emotions.forEach((emotion) => {
					emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
				})
			}
		})

		const topEmotion = Object.entries(emotionCounts).sort(
			([, a], [, b]) => b - a,
		)[0]?.[0] as Emotion | undefined

		// 리뷰 작성률
		const withReview = todos.filter(
			(t) => t.completed && t.review && t.review.trim() !== '',
		).length
		const reviewRate =
			completed > 0 ? Math.round((withReview / completed) * 100) : 0

		return {
			total,
			completed,
			pending,
			completionRate,
			emotionCounts,
			topEmotion,
			withReview,
			reviewRate,
		}
	}, [todos])

	if (!stats) {
		return (
			<div className="space-y-8">
				<div className="text-center text-text-sub">로딩 중...</div>
			</div>
		)
	}

	const topEmotionData = stats.topEmotion
		? EMOTIONS.find((e) => e.value === stats.topEmotion)
		: null

	return (
		<div className="space-y-8 max-w-4xl mx-auto">
			{/* Header */}
			<div>
				<h1 className="text-[28px] font-semibold leading-[1.4] text-text-main mb-2">
					오늘의 나를 돌아볼까요?
				</h1>
				<p className="text-[16px] text-text-sub leading-[1.7]">
					오늘 하루 동안의 활동과 감정을 한눈에 확인하세요
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* 완료율 카드 */}
				<div className="bg-bg-surface p-6 rounded-[20px] border border-border-soft shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-text-sub">
							완료율
						</h3>
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-3xl font-bold text-text-main">
							{stats.completionRate}%
						</div>
						<div className="text-sm text-text-sub">
							{stats.completed}/{stats.total} 완료
						</div>
						{/* Progress Bar */}
						<div className="w-full bg-bg-page rounded-full h-2 mt-3">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-500"
								style={{
									width: `${stats.completionRate}%`,
								}}
							/>
						</div>
					</div>
				</div>

				{/* 오늘의 감정 카드 */}
				<div className="bg-bg-surface p-6 rounded-[20px] border border-border-soft shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-text-sub">
							오늘의 감정
						</h3>
						<div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-accent"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
					<div className="space-y-2">
						{topEmotionData ? (
							<>
								<div className="text-4xl">
									{topEmotionData.emoji}
								</div>
								<div className="text-xl font-semibold text-text-main">
									{topEmotionData.label}
								</div>
								<div className="text-sm text-text-sub">
									{stats.emotionCounts[stats.topEmotion!]}번
									느꼈어요
								</div>
							</>
						) : (
							<div className="text-text-muted text-sm">
								아직 기록된 감정이 없어요
							</div>
						)}
					</div>
				</div>

				{/* 회고 작성률 카드 */}
				<div className="bg-bg-surface p-6 rounded-[20px] border border-border-soft shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-text-sub">
							회고 작성
						</h3>
						<div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-3xl font-bold text-text-main">
							{stats.reviewRate}%
						</div>
						<div className="text-sm text-text-sub">
							{stats.withReview}/{stats.completed} 작성
						</div>
						<div className="w-full bg-bg-page rounded-full h-2 mt-3">
							<div
								className="bg-success h-2 rounded-full transition-all duration-500"
								style={{ width: `${stats.reviewRate}%` }}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* 감정 분포 */}
			{Object.keys(stats.emotionCounts).length > 0 && (
				<div className="bg-bg-surface p-6 rounded-[20px] border border-border-soft shadow-sm">
					<h3 className="text-lg font-semibold text-text-main mb-4">
						감정 분포
					</h3>
					<div className="flex flex-wrap gap-3">
						{Object.entries(stats.emotionCounts)
							.sort(([, a], [, b]) => b - a)
							.map(([emotion, count]) => {
								const emotionData = EMOTIONS.find(
									(e) => e.value === emotion,
								)
								if (!emotionData) return null

								return (
									<div
										key={emotion}
										className="flex items-center gap-2 px-2 py-1 bg-bg-page rounded-full border border-border-soft"
									>
										<span className="text-xl">
											{emotionData.emoji}
										</span>
										<span className="text-sm font-medium text-text-main">
											{emotionData.label}
										</span>
										<span className="text-xs text-text-sub bg-bg-surface px-2 py-0.5 rounded-full">
											{count}
										</span>
									</div>
								)
							})}
					</div>
				</div>
			)}

			{/* 미완료 태스크 */}
			{stats.pending > 0 && (
				<div className="bg-bg-surface p-6 rounded-[20px] border border-border-soft shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-text-main">
							아직 남은 할 일
						</h3>
						<span className="text-sm text-text-sub">
							{stats.pending}개
						</span>
					</div>
					<ul className="space-y-2">
						{todos
							?.filter((t) => !t.completed)
							.slice(0, 5)
							.map((todo) => (
								<li
									key={todo.id}
									className="flex items-center gap-3 p-3 bg-bg-page rounded-lg"
								>
									<div className="w-2 h-2 rounded-full bg-warning" />
									<span className="text-sm text-text-main">
										{todo.title}
									</span>
								</li>
							))}
					</ul>
					{stats.pending > 5 && (
						<div className="mt-3 text-sm text-text-sub text-center">
							외 {stats.pending - 5}개 더
						</div>
					)}
				</div>
			)}
		</div>
	)
}
