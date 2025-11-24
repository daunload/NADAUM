import { MonthlyTodoResponse } from '../types'

export const getMonthlyTasks = async ({
	year,
	month,
}: {
	year: number
	month: number
}): Promise<MonthlyTodoResponse> => {
	const res = await fetch(`/api/todos/monthly?year=${year}&month=${month}`)

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error)
	}

	return await res.json()
}
