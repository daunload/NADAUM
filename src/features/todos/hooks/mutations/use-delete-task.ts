import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../query-key'
import { deleteTask } from '../../api/delete-task'

/** 태스크 삭제 */
export function useDeleteTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => deleteTask(id),

		// 낙관적 업데이트
		onMutate: async (id) => {
			await queryClient.cancelQueries({
				queryKey: queryKeys.todos.today(),
			})
			await queryClient.cancelQueries({
				queryKey: queryKeys.todos.allTasks(),
			})

			const previousAllTasks = queryClient.getQueryData<Todo[]>(
				queryKeys.todos.allTasks(),
			)
			const previousToday = queryClient.getQueryData<Todo[]>(
				queryKeys.todos.today(),
			)

			if (previousToday) {
				queryClient.setQueryData<Todo[]>(
					queryKeys.todos.today(),
					previousToday.filter((todo) => todo.id !== id),
				)
			}

			if (previousAllTasks) {
				queryClient.setQueryData<Todo[]>(
					queryKeys.todos.allTasks(),
					previousAllTasks.filter((todo) => todo.id !== id),
				)
			}

			return { previousAllTasks, previousToday }
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.todos.today() })
			queryClient.invalidateQueries({
				queryKey: queryKeys.todos.allTasks(),
			})
		},
		onError: (error, _, context) => {
			if (context?.previousToday) {
				queryClient.setQueryData(
					queryKeys.todos.today(),
					context.previousToday,
				)
			}
			if (context?.previousAllTasks) {
				queryClient.setQueryData(
					queryKeys.todos.allTasks(),
					context.previousAllTasks,
				)
			}
			console.error(error)
		},
	})
}
