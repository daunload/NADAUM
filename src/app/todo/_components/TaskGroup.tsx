import TaskItem from './TaskItem'

export default function TaskGroup({
	taskList,
	onDelete,
	onToggle,
}: {
	taskList: Todo[]
	onDelete: (taskId: string) => void
	onToggle: (taskId: string, isCompleted: boolean) => void
}) {
	return (
		<>
			{taskList.length > 0 && (
				<ul className="mt-2 gap-2 flex flex-col">
					{taskList.map((todo) => (
						<TaskItem
							key={todo.id}
							todo={todo}
							onDelete={onDelete}
							onToggle={onToggle}
						/>
					))}
				</ul>
			)}
		</>
	)
}
