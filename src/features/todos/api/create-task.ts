import { TodoTask } from '../types'

export const createTask = async (text: string): Promise<TodoTask> => {
	const res = await fetch('/api/todos', {
		method: 'POST',
		body: JSON.stringify({ title: text.trim() }),
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
