import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../query-key'
import { createTask } from '../../api/create-task'

/** 태스크 추가 */
export function useCreateTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (text: string) => createTask(text),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.todos.today() })
			queryClient.invalidateQueries({
				queryKey: queryKeys.todos.allTasks(),
			})
		},
	})
}
