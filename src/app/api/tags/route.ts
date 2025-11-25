import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/with-auth'
import { NextResponse } from 'next/server'

/** 사용자의 태그 목록 조회 */
export const GET = withAuth(async (req, { user }) => {
	try {
		const userData = await prisma.user.findUnique({
			where: { id: user.id },
			select: { availableTags: true },
		})

		return NextResponse.json({ tags: userData?.availableTags || [] })
	} catch (error) {
		console.error('태그 조회 에러:', error)
		return NextResponse.json(
			{ error: '태그를 조회하는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})
