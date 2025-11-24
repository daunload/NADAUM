import { getMonthlyTasks } from '@/features/todos/api/get-monthly-todo'
import { useQuery } from '@tanstack/react-query'

export function useMonthlyTasks(year: number, month: number) {
	return useQuery({
		queryKey: ['todos', 'monthly', year, month],
		queryFn: async () => getMonthlyTasks({ year, month }),
	})
}
