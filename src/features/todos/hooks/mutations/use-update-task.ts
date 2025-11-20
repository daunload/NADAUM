import { queryKeys } from '@/features/query-key'
import { updateTask } from '@/features/todos/api/update-task'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/** 태스크 수정 */
export function useUpdateTask() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			title,
			completed,
		}: {
			id: string
			title?: string
			completed?: boolean
		}) => updateTask(id, { title, completed }),

		onMutate: async ({ id, title, completed }) => {
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
						todo.id === id
							? {
									...todo,
									...(title !== undefined && { title }),
									...(completed !== undefined && {
										completed,
									}),
								}
							: todo,
					),
				)
			}

			if (previousAllTasks) {
				queryClient.setQueryData<Todo[]>(
					queryKeys.todos.today(),
					previousAllTasks.map((todo) =>
						todo.id === id
							? {
									...todo,
									...(title !== undefined && { title }),
									...(completed !== undefined && {
										completed,
									}),
								}
							: todo,
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
