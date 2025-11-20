import { TodoTask } from '../types'

export const getTasks = async (): Promise<TodoTask[]> => {
	const res = await fetch('/api/todos')

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
