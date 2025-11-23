'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		return new Date(year, month + 1, 0).getDate()
	}

	const getFirstDayOfMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		return new Date(year, month, 1).getDay()
	}

	const handlePrevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		)
	}

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		)
	}

	const daysInMonth = getDaysInMonth(currentDate)
	const firstDay = getFirstDayOfMonth(currentDate)
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
	const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

	const isToday = (day: number) => {
		const today = new Date()
		return (
			day === today.getDate() &&
			currentDate.getMonth() === today.getMonth() &&
			currentDate.getFullYear() === today.getFullYear()
		)
	}

	const weekDays = ['일', '월', '화', '수', '목', '금', '토']

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-text-main">
					{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
				</h2>
				<div className="flex gap-2">
					<Button variant="secondary" size="sm" onClick={handlePrevMonth}>
						이전달
					</Button>
					<Button variant="secondary" size="sm" onClick={handleNextMonth}>
						다음달
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-2 mb-2">
				{weekDays.map((day) => (
					<div
						key={day}
						className="text-center text-sm font-medium text-text-sub py-2"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-2">
				{emptyDays.map((_, index) => (
					<div key={`empty-${index}`} className="h-24" />
				))}
				{days.map((day) => (
					<div
						key={day}
						className={`h-24 border rounded-xl p-2 flex flex-col items-start justify-start transition-colors hover:bg-bg-subtle/30 ${
							isToday(day)
								? 'bg-primary/10 border-primary text-primary'
								: 'border-border-soft text-text-main bg-bg-surface'
						}`}
					>
						<span
							className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
								isToday(day) ? 'bg-primary text-text-inverse' : ''
							}`}
						>
							{day}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
