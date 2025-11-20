import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { User } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

type HandlerContext<T = unknown> = {
	user: User
	params: Promise<T>
}

type AuthenticatedHandler<T = unknown> = (
	req: Request,
	context: HandlerContext<T>,
) => Promise<NextResponse>

export const withAuth =
	<T>(handler: AuthenticatedHandler<T>) =>
	async (
		req: Request,
		routeContext: { params: Promise<T> },
	): Promise<NextResponse> => {
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

			return handler(req, { user, params: routeContext.params })
		} catch (error) {
			return NextResponse.json(
				{ error: '서버 내부 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}
	}
