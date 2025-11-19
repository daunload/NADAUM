import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

/** 오늘 Todo 조회 */
export async function GET(request: Request) {
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

		// 오늘 00:00:00
		const startOfToday = new Date()
		startOfToday.setHours(0, 0, 0, 0)

		// 내일 00:00:00
		const startOfTomorrow = new Date(startOfToday)
		startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

		const todos = await prisma.todo.findMany({
			where: {
				userId: user.id,
				createdAt: {
					gte: startOfToday,
					lt: startOfTomorrow,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(todos)
	} catch (error) {
		console.error('오늘 Todo 조회 에러:', error)
		return NextResponse.json(
			{ error: '오늘 Todo를 불러오는데 실패했습니다.' },
			{ status: 500 },
		)
	}
}
