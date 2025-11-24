import { Todo } from '@/features/todos/types'

export default function CalendarDay({
	day,
	isToday,
	tasks,
}: {
	day: number
	isToday: boolean
	tasks: Todo[]
}) {
	return (
		<div
			key={day}
			className={`h-24 border rounded-xl p-2 flex flex-col items-start justify-start transition-colors hover:bg-bg-subtle/30 ${
				isToday
					? 'bg-primary/10 border-primary text-primary'
					: 'border-border-soft text-text-main bg-bg-surface'
			}`}
		>
			<span
				className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
					isToday ? 'bg-primary text-text-inverse' : ''
				}`}
			>
				{day}
			</span>
			{tasks.length > 0 && (
				<div className="flex flex-col w-full h-full items-center justify-center">
					{tasks.length > 0 && (
						<div className="text-md items-center justify-center flex text-text-main">
							{tasks.length}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
