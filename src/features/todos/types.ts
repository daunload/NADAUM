export interface Todo {
	id: string
	title: string
	completed: boolean
	review: string
	createdAt: Date
	updatedAt: Date
}

export type TodoResponse = Todo

export interface CreateTodoRequest {
	title: string
}

export interface UpdateTodoRequest {
	title?: string
	completed?: boolean
	review?: string
}

export interface MonthlyTodoResponse {
	year: number
	month: number
	todos: TodoResponse[]
}
