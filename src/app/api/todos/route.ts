import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/with-auth'
import { NextResponse } from 'next/server'

/** 모든 Todo 조회 */
export const GET = withAuth(async (req, { user }) => {
	try {
		const todos = await prisma.todoTask.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(todos)
	} catch (error) {
		console.error('Todo 조회 에러:', error)
		return NextResponse.json(
			{ error: 'Todo를 불러오는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})

/** 새로운 Todo 생성 */
export const POST = withAuth(async (req, { user }) => {
	try {
		const body = await req.json()
		const { title } = body

		if (!title || title.trim() === '') {
			return NextResponse.json(
				{ error: '제목은 필수입니다.' },
				{ status: 400 },
			)
		}

		const todo = await prisma.todoTask.create({
			data: {
				title: title.trim(),
				userId: user.id,
			},
		})

		return NextResponse.json(todo, { status: 201 })
	} catch (error) {
		console.error('Todo 생성 에러:', error)
		return NextResponse.json(
			{ error: 'Todo를 생성하는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})
