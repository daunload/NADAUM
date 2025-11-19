import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

/** 모든 Todo 조회 */
export async function GET(request: Request) {
	try {
		const session = await getServerSession(authOptions)
		console.log(session)

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

		const todos = await prisma.todo.findMany({
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
}

/** 새로운 Todo 생성 */
export async function POST(request: Request) {
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

		const body = await request.json()
		const { title } = body

		if (!title || title.trim() === '') {
			return NextResponse.json(
				{ error: '제목은 필수입니다.' },
				{ status: 400 },
			)
		}

		const todo = await prisma.todo.create({
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
}
