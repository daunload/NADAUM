'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginButton() {
	const { data: session, status } = useSession()

	if (status === 'loading') return <div>로딩 중...</div>

	if (session) {
		return (
			<div>
				<p>환영합니다, {session.user?.name}님!</p>
				<img src={session.user?.image || ''} alt="프로필" />
				<button onClick={() => signOut()}>로그아웃</button>
			</div>
		)
	}

	return <button onClick={() => signIn('google')}>Google로 로그인</button>
}
