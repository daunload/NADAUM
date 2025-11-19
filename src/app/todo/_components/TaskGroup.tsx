import TaskItem from './TaskItem'

export default function TaskGroup({
	taskList,
	onDelete,
}: {
	taskList: Todo[]
	onDelete: (taskId: string) => void
}) {
	return (
		<>
			{taskList.length > 0 && (
				<ul className="mt-2">
					{taskList.map((todo) => (
						<TaskItem
							key={todo.id}
							todo={todo}
							onDelete={onDelete}
						/>
					))}
				</ul>
			)}
		</>
	)
}
