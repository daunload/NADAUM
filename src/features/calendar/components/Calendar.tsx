'use client'

import { Button } from '@/components/ui/button'
import { Todo } from '@/features/todos/types'
import { useEffect, useRef, useState } from 'react'
import { useMonthlyTasks } from '../hooks/queries/use-monthly-todos'
import CalendarDay from './CalendarDay'
import { DayDetailDialog } from './DayDetailDialog'

export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const { data: monthlyTasks } = useMonthlyTasks(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
	)

	const [monthlyTasksByDay, setMonthlyTasksByDay] = useState<
		Record<number, Todo[]>
	>({})

	const [selectedDay, setSelectedDay] = useState<number | null>(null)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [originRect, setOriginRect] = useState<DOMRect | null>(null)

	const dayRefs = useRef<Map<number, HTMLDivElement>>(new Map())

	useEffect(() => {
		if (!monthlyTasks) return

		const grouped: Record<number, Todo[]> = {}

		monthlyTasks.todos.forEach((todo) => {
			const day = new Date(todo.createdAt).getDate()
			if (!grouped[day]) {
				grouped[day] = []
			}
			grouped[day].push(todo)
		})

		setMonthlyTasksByDay(grouped)
	}, [monthlyTasks])

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

	const handleDayClick = (day: number) => {
		const element = dayRefs.current.get(day)
		if (element) setOriginRect(element.getBoundingClientRect())
		setSelectedDay(day)
		setDialogOpen(true)
	}

	const weekDays = ['일', '월', '화', '수', '목', '금', '토']

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-text-main">
					{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
				</h2>
				<div className="flex gap-2">
					<Button
						variant="secondary"
						size="sm"
						onClick={handlePrevMonth}
					>
						이전달
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={handleNextMonth}
					>
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
					<CalendarDay
						ref={(el) => {
							if (el) dayRefs.current.set(day, el)
							else dayRefs.current.delete(day)
						}}
						day={day}
						isToday={isToday(day)}
						tasks={monthlyTasksByDay[day] || []}
						onClick={() => handleDayClick(day)}
						key={day}
					/>
				))}
			</div>

			<DayDetailDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				day={selectedDay || 1}
				year={currentDate.getFullYear()}
				month={currentDate.getMonth() + 1}
				tasks={selectedDay ? monthlyTasksByDay[selectedDay] || [] : []}
				originRect={originRect}
			/>
		</div>
	)
}
