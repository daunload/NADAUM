import { TodoTask } from '../types'

export const getTodayTasks = async (): Promise<TodoTask[]> => {
	const res = await fetch('/api/todos/today')

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
