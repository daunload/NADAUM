import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/with-auth'
import { NextResponse } from 'next/server'

/** 오늘 Todo 조회 */
export const GET = withAuth(async (req, { user }) => {
	const startOfToday = new Date()
	startOfToday.setHours(0, 0, 0, 0)

	const startOfTomorrow = new Date(startOfToday)
	startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

	const todos = await prisma.todoTask.findMany({
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
})
