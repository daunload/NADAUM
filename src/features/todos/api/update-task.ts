import { TodoResponse, UpdateTodoRequest } from '../types'

export const updateTask = async (
	id: string,
	task: UpdateTodoRequest,
): Promise<TodoResponse> => {
	const res = await fetch(`/api/todos/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(task),
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
