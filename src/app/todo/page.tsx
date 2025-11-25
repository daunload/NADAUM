'use client'

import {
	TaskDetailPanel,
	TaskGroup,
	TaskGroupTitle,
	TaskNewItem,
} from '@/features/todos/components/'

import { UpdateTodoRequest } from '@/features/todos/types'
import { useState } from 'react'
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

	const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)

	const activeTodos = todos?.filter((todo) => !todo.completed) ?? []
	const completedTodos = todos?.filter((todo) => todo.completed) ?? []

	const selectedTodo =
		todos?.find((todo) => todo.id === selectedTodoId) ?? null

	const handleSelect = (id: string) => {
		setSelectedTodoId(id)
	}

	const handleClosePanel = () => {
		setSelectedTodoId(null)
	}

	const handleUpdateFromPanel = (id: string, updates: UpdateTodoRequest) => {
		updateTask.mutate({ id, ...updates })
	}

	const handleDeleteFromPanel = (id: string) => {
		deleteTask.mutate(id)
		setSelectedTodoId(null)
	}

	return (
		<div className="flex justify-center bg-bg-page h-full">
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
								onSelect={handleSelect}
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
									onSelect={handleSelect}
								/>
							</div>
						)}
					</>
				</div>
			</div>

			<TaskDetailPanel
				todo={selectedTodo}
				onClose={handleClosePanel}
				onUpdate={handleUpdateFromPanel}
				onDelete={handleDeleteFromPanel}
				onToggle={(id, completed) =>
					updateTask.mutate({
						id,
						completed: !completed,
					})
				}
			/>
		</div>
	)
}
