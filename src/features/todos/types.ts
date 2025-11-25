import { Emotion } from '../emotion/types'

export interface Todo {
	id: string
	title: string
	completed: boolean
	review: string
	emotion: Emotion
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
	emotion?: Emotion
}

export interface MonthlyTodoResponse {
	year: number
	month: number
	todos: TodoResponse[]
}
