import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
	const session = await getServerSession(authOptions)

	if (!session) {
		return NextResponse.redirect(new URL('/auth/signin', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/todo/:path*', '/dashboard/:path*'],
}
