import { Todo } from '@/features/todos/types'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'

const CalendarDay = forwardRef<
	HTMLDivElement,
	{
		day: number
		isToday: boolean
		tasks: Todo[]
		onClick?: () => void
	}
>(({ day, isToday, tasks, onClick }, ref) => {
	const completedTasks = tasks.filter((task) => task.completed).length
	const totalTasks = tasks.length

	return (
		<div
			ref={ref}
			onClick={onClick}
			className={`h-24 border rounded-xl p-2 flex flex-col items-start justify-start transition-all duration-200 hover:bg-bg-subtle/30 cursor-pointer hover:scale-105 active:scale-95 ${
				isToday
					? 'bg-primary/10 border-primary text-primary'
					: 'border-border-soft text-text-main bg-bg-surface'
			}`}
		>
			<div className="flex items-start justify-between">
				<span
					className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
						isToday
							? 'bg-primary text-text-inverse'
							: 'text-text-main'
					}`}
				>
					{day}
				</span>
			</div>

			{totalTasks > 0 && (
				<div className="flex items-center mt-2">
					<Check className="w-4 h-4 text-green-600" />
					<p className="text-xs text-text-sub font-medium">
						{completedTasks}/{totalTasks}
					</p>
				</div>
			)}
		</div>
	)
})

CalendarDay.displayName = 'CalendarDay'

export default CalendarDay
