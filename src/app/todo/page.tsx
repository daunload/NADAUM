'use client'

import TaskGroup from '../../features/todos/components/TaskGroup'
import TaskGroupTitle from '../../features/todos/components/TaskGroupTitle'
import TaskNewItem from '../../features/todos/components/TaskNewItem'

import {
	useCreateTask,
	useDeleteTask,
	useTodayTasks,
	useUpdateTask,
} from '../../features/todos/hooks'

export default function TodoPage() {
	const { data: todos } = useTodayTasks()

	const addTask = useCreateTask()
	const deleteTask = useDeleteTask()
	const updateTask = useUpdateTask()

	const activeTodos = todos?.filter((todo) => !todo.completed) ?? []
	const completedTodos = todos?.filter((todo) => todo.completed) ?? []

	return (
		<div className="flex items-center justify-center bg-bg-page">
			<div className="w-full">
				<TaskNewItem onAddTask={(text) => addTask.mutate(text)} />

				<div className="px-8 pb-8 max-h-[600px] overflow-y-auto custom-scrollbar">
					<>
						<div className="mt-4">
							<TaskGroupTitle title={'할 일'}></TaskGroupTitle>
							<TaskGroup
								taskList={activeTodos}
								onDelete={(id) => deleteTask.mutate(id)}
								onToggle={(id, completed) =>
									updateTask.mutate({
										id,
										completed: !completed,
									})
								}
							/>
						</div>

						{completedTodos.length > 0 && (
							<div className="mt-4">
								<TaskGroupTitle
									title={'완료한 일'}
								></TaskGroupTitle>
								<TaskGroup
									taskList={completedTodos}
									onDelete={(id) => deleteTask.mutate(id)}
									onToggle={(id, completed) =>
										updateTask.mutate({
											id,
											completed: !completed,
										})
									}
								/>
							</div>
						)}
					</>
				</div>
			</div>
		</div>
	)
}
