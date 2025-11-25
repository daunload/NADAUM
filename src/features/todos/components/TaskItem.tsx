import Toggle from '@/components/ui/toggle'
import { Todo } from '../types'

export default function TaskItem({
	todo,
	onDelete,
	onToggle,
	onSelect,
}: {
	todo: Todo
	onDelete: (taskId: string) => void
	onToggle: (taskId: string, isCompleted: boolean) => void
	onSelect?: (taskId: string) => void
}) {
	return (
		<li
			className="group flex items-center gap-4 bg-bg-surface p-4 rounded-[20px] border border-border-soft shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-accent/50 transition-all duration-300 cursor-pointer"
			onClick={() => onSelect?.(todo.id)}
		>
			<Toggle
				active={todo.completed}
				onClick={(e) => {
					e.stopPropagation()
					onToggle(todo.id, todo.completed)
				}}
			></Toggle>

			<span
				className={`grow text-lg transition-all duration-200 ${
					todo.completed
						? 'text-text-muted line-through'
						: 'text-text-main'
				}`}
			>
				{todo.title}
			</span>

			<button
				onClick={(e) => {
					e.stopPropagation()
					onDelete(todo.id)
				}}
				className="opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-xl transition-all duration-200"
				aria-label="Delete task"
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
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
		</li>
	)
}
