'use client'

import { useEffect, useState } from 'react'

interface Todo {
	id: string
	title: string
	completed: boolean
}

export default function TodoPage() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		async function load() {
			const res = await fetch('/api/todos/today')
			const todosData = await res.json()

			setTodos(todosData)
		}

		load()
	}, [])

	const addTodo = async (e?: React.FormEvent) => {
		if (e) e.preventDefault()
		if (!inputValue.trim()) return

		const res = await fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify({ title: inputValue.trim() }),
		})
		const todosData = await res.json()

		setTodos((prev) => [todosData, ...prev])
		setInputValue('')
	}

	const deleteTodo = (id: string) => {}

	const activeTodos = todos.filter((todo) => !todo.completed)
	const completedTodos = todos.filter((todo) => todo.completed)

	return (
		<div className="min-h-[80vh] flex items-center justify-center py-12 bg-bg-page">
			<div className="w-full max-w-2xl bg-bg-surface rounded-3xl shadow-xl border border-border-soft overflow-hidden transition-all duration-300">
				{/* Header */}
				<div className="bg-bg-subtle p-8">
					<h1 className="text-3xl font-bold tracking-tight text-text-main">
						오늘의 기준
					</h1>
					<p className="text-text-sub mt-2 opacity-90">
						미완료된 기준: {activeTodos.length}
					</p>
				</div>

				{/* Input Area */}
				<div className="p-8 pb-4">
					<form onSubmit={addTodo} className="relative group">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="What needs to be done?"
							className="w-full bg-bg-surface text-text-main placeholder-text-muted border-2 border-border-strong rounded-2xl py-4 pl-6 pr-16 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
						/>
						<button
							type="submit"
							disabled={!inputValue.trim()}
							className="absolute right-3 top-3 bottom-3 aspect-square bg-primary hover:opacity-90 disabled:bg-border-strong disabled:cursor-not-allowed text-text-inverse rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</button>
					</form>
				</div>

				{/* Todo List */}
				<div className="px-8 pb-8 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
					{todos.length === 0 ? (
						<div className="text-center py-12 text-text-muted">
							<div className="mb-4 flex justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-16 h-16 opacity-20"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-lg">
								No tasks yet. Add one above!
							</p>
						</div>
					) : (
						<>
							{/* Active Tasks */}
							{activeTodos.length > 0 && (
								<div className="space-y-3">
									<h2 className="text-sm font-semibold text-accent uppercase tracking-wider ml-1">
										To Do
									</h2>
									{activeTodos.map((todo) => (
										<TodoItem
											key={todo.id}
											todo={todo}
											onDelete={() => deleteTodo(todo.id)}
										/>
									))}
								</div>
							)}

							{/* Completed Tasks */}
							{completedTodos.length > 0 && (
								<div className="space-y-3">
									<h2 className="text-sm font-semibold text-accent uppercase tracking-wider ml-1">
										Completed
									</h2>
									{completedTodos.map((todo) => (
										<TodoItem
											key={todo.id}
											todo={todo}
											onDelete={() => deleteTodo(todo.id)}
										/>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

function TodoItem({ todo, onDelete }: { todo: Todo; onDelete: () => void }) {
	return (
		<div className="group flex items-center gap-4 bg-bg-surface p-4 rounded-2xl border border-border-soft shadow-sm hover:shadow-md hover:border-accent transition-all duration-200">
			<button
				className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
					todo.completed
						? 'bg-accent border-accent'
						: 'border-border-strong hover:border-accent'
				}`}
			>
				{todo.completed && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={3}
						stroke="currentColor"
						className="w-3.5 h-3.5 text-text-inverse"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				)}
			</button>

			<span
				className={`flex-grow text-lg transition-all duration-200 ${
					todo.completed
						? 'text-text-muted line-through'
						: 'text-text-main'
				}`}
			>
				{todo.title}
			</span>

			<button
				onClick={onDelete}
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
		</div>
	)
}
