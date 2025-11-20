import { queryKeys } from '@/features/query-key'
import { updateTask } from '@/features/todos/api/update-task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo, UpdateTodoRequest } from '../../types'

/** 태스크 수정 */
export function useUpdateTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, ...data }: { id: string } & UpdateTodoRequest) =>
			updateTask(id, data),

		onMutate: async ({ id, ...data }) => {
			await queryClient.cancelQueries({
				queryKey: queryKeys.todos.today(),
			})
			await queryClient.cancelQueries({
				queryKey: queryKeys.todos.allTasks(),
			})

			const previousToday = queryClient.getQueryData<Todo[]>(
				queryKeys.todos.today(),
			)
			const previousAllTasks = queryClient.getQueryData<Todo[]>(
				queryKeys.todos.allTasks(),
			)

			if (previousToday) {
				queryClient.setQueryData<Todo[]>(
					queryKeys.todos.today(),
					previousToday.map((todo) =>
						todo.id === id ? { ...todo, ...data } : todo,
					),
				)
			}

			if (previousAllTasks) {
				queryClient.setQueryData<Todo[]>(
					queryKeys.todos.allTasks(),
					previousAllTasks.map((todo) =>
						todo.id === id ? { ...todo, ...data } : todo,
					),
				)
			}

			return { previousToday, previousAllTasks }
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
