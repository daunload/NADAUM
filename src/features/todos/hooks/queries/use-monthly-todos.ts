import { useQuery } from '@tanstack/react-query'
import { getMonthlyTasks } from '../../api/get-monthly-todo'

export function useMonthlyTodos(year: number, month: number) {
	return useQuery({
		queryKey: ['todos', 'monthly', year, month],
		queryFn: () => getMonthlyTasks({ year, month }),
	})
}
