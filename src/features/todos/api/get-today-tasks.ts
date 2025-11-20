import { TodoResponse } from '../types'

export const getTodayTasks = async (): Promise<TodoResponse[]> => {
	const res = await fetch('/api/todos/today')

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
