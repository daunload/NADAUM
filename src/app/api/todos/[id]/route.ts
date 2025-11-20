import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

/** Todo 수정 */
export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: '인증이 필요합니다.' },
				{ status: 401 },
			)
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		})

		if (!user) {
			return NextResponse.json(
				{ error: '사용자를 찾을 수 없습니다.' },
				{ status: 404 },
			)
		}

		const { id } = await params
		const body = await request.json()
		const { title, completed } = body

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
}

/** Todo 삭제 */
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: '인증이 필요합니다.' },
				{ status: 401 },
			)
		}

		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
		})

		if (!user) {
			return NextResponse.json(
				{ error: '사용자를 찾을 수 없습니다.' },
				{ status: 404 },
			)
		}

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
}
