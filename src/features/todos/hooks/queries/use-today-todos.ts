import { useQuery } from '@tanstack/react-query'
import { getTodayTasks } from '../../api/get-today-tasks'

export function useTodayTasks() {
	return useQuery({
		queryKey: ['todos', 'today'],
		queryFn: async () => getTodayTasks(),
	})
}
