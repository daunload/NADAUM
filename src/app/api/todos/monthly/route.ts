import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/with-auth'
import { NextResponse } from 'next/server'

/** 특정 년도/월의 Todo 조회 */
export const GET = withAuth(async (req, { user }) => {
	try {
		const { searchParams } = new URL(req.url)
		const year = searchParams.get('year')
		const month = searchParams.get('month')

		if (!year || !month) {
			return NextResponse.json(
				{ error: '년도와 월 파라미터가 필요합니다.' },
				{ status: 400 },
			)
		}

		const yearNum = parseInt(year, 10)
		const monthNum = parseInt(month, 10)

		if (
			isNaN(yearNum) ||
			isNaN(monthNum) ||
			monthNum < 1 ||
			monthNum > 12
		) {
			return NextResponse.json(
				{ error: '유효하지 않은 년도 또는 월입니다.' },
				{ status: 400 },
			)
		}

		const startDate = new Date(yearNum, monthNum - 1, 1)
		const endDate = new Date(yearNum, monthNum, 1)

		const todos = await prisma.todoTask.findMany({
			where: {
				userId: user.id,
				createdAt: {
					gte: startDate,
					lt: endDate,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json({
			year: yearNum,
			month: monthNum,
			todos,
		})
	} catch (error) {
		console.error('월별 Todo 조회 에러:', error)
		return NextResponse.json(
			{ error: 'Todo를 불러오는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})
