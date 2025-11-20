'use client'

import { useEffect, useState } from 'react'
import TaskGroup from './_components/TaskGroup'
import TaskGroupTitle from './_components/TaskGroupTitle'
import TaskNewItem from './_components/TaskNewItem'

export default function TodoPage() {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		async function load() {
			const res = await fetch('/api/todos/today')
			const todosData = await res.json()

			setTodos(todosData)
		}

		load()
	}, [])

	/** 태스크 추가 */
	const addTask = async (inputValue: string) => {
		const res = await fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify({ title: inputValue.trim() }),
		})
		const todosData = await res.json()

		setTodos((prev) => [todosData, ...prev])
	}

	/** 태스크 삭제 */
	const deleteTask = async (id: string) => {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE',
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => null)
			const msg = errorData?.error ?? '삭제에 실패했습니다.'
			throw new Error(msg)
		}

		setTodos((prev) => prev.filter((todo) => todo.id !== id))
	}

	const toggleTask = async (id: string, isCompleted: boolean) => {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: !isCompleted }),
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => null)
			const msg = errorData?.error ?? '업데이트에 실패했습니다.'
			throw new Error(msg)
		}

		const todosData = await res.json()

		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todosData } : todo)),
		)
	}

	const activeTodos = todos.filter((todo) => !todo.completed)
	const completedTodos = todos.filter((todo) => todo.completed)

	return (
		<div className="flex items-center justify-center bg-bg-page">
			<div className="w-full">
				<TaskNewItem onAddTask={addTask} />

				<div className="px-8 pb-8 max-h-[600px] overflow-y-auto custom-scrollbar">
					<>
						<div className="mt-4">
							<TaskGroupTitle title={'할 일'}></TaskGroupTitle>
							<TaskGroup
								taskList={activeTodos}
								onDelete={deleteTask}
								onToggle={toggleTask}
							/>
						</div>

						{completedTodos.length > 0 && (
							<div className="mt-4">
								<TaskGroupTitle
									title={'완료한 일'}
								></TaskGroupTitle>
								<TaskGroup
									taskList={completedTodos}
									onDelete={deleteTask}
									onToggle={toggleTask}
								/>
							</div>
						)}
					</>
				</div>
			</div>
		</div>
	)
}
