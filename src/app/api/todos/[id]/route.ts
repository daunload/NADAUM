import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/with-auth'
import { NextResponse } from 'next/server'

/** Todo 수정 */
export const PATCH = withAuth<{ id: string }>(async (req, { user, params }) => {
	try {
		const { id } = await params

		const body = await req.json()
		const { title, completed, review } = body

		const existingTodo = await prisma.todoTask.findUnique({
			where: { id },
		})

		if (!existingTodo) {
			return NextResponse.json(
				{ error: 'Todo를 찾을 수 없습니다.' },
				{ status: 404 },
			)
		}

		if (existingTodo.userId !== user.id) {
			return NextResponse.json(
				{ error: '권한이 없습니다.' },
				{ status: 403 },
			)
		}

		const todo = await prisma.todoTask.update({
			where: { id },
			data: {
				...(title !== undefined && { title: title.trim() }),
				...(completed !== undefined && { completed }),
				...(review !== undefined && { review }),
			},
		})

		return NextResponse.json(todo)
	} catch (error) {
		console.error('Todo 수정 에러:', error)
		return NextResponse.json(
			{ error: 'Todo를 수정하는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})

/** Todo 삭제 */
export const DELETE = withAuth<{ id: string }>(
	async (req, { user, params }) => {
		try {
			const { id } = await params

			const existingTodo = await prisma.todoTask.findUnique({
				where: { id },
			})

			if (!existingTodo) {
				return NextResponse.json(
					{ error: 'Todo를 찾을 수 없습니다.' },
					{ status: 404 },
				)
			}

			if (existingTodo.userId !== user.id) {
				return NextResponse.json(
					{ error: '권한이 없습니다.' },
					{ status: 403 },
				)
			}

			await prisma.todoTask.delete({
				where: { id },
			})

			return NextResponse.json({ message: 'Todo가 삭제되었습니다.' })
		} catch (error) {
			console.error('Todo 삭제 에러:', error)
			return NextResponse.json(
				{ error: 'Todo를 삭제하는데 실패했습니다.' },
				{ status: 500 },
			)
		}
	},
)
