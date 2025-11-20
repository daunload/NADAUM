export const queryKeys = {
	todos: {
		all: ['todos'] as const,
		today: () => [...queryKeys.todos.all, 'today'] as const,
		allTasks: () => [...queryKeys.todos.all, 'all-tasks'] as const,
	},
}
