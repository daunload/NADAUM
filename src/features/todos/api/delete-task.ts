export const deleteTask = async (id: string): Promise<{ message: string }> => {
	const res = await fetch(`/api/todos/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
