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

export const POST = withAuth(async (req, { user }) => {
	try {
		const { tag } = await req.json()

		if (!tag || typeof tag !== 'string') {
			return NextResponse.json(
				{ error: '유효하지 않은 태그입니다.' },
				{ status: 400 },
			)
		}

		const userData = await prisma.user.findUnique({
			where: { id: user.id },
			select: { availableTags: true },
		})

		const currentTags = userData?.availableTags || []

		if (currentTags.includes(tag)) {
			return NextResponse.json(
				{ error: '이미 존재하는 태그입니다.' },
				{ status: 400 },
			)
		}

		await prisma.user.update({
			where: { id: user.id },
			data: {
				availableTags: {
					push: tag,
				},
			},
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('태그 추가 에러:', error)
		return NextResponse.json(
			{ error: '태그를 추가하는데 실패했습니다.' },
			{ status: 500 },
		)
	}
})
