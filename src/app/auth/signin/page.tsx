'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
	return (
		<div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-bg-page p-4">
			<div className="w-full max-w-md bg-bg-surface rounded-3xl shadow-xl border border-border-soft p-8 md:p-12 text-center transition-all duration-300 hover:shadow-2xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-text-main mb-3 tracking-tight">
						NADAUM
					</h1>
					<p className="text-text-sub text-lg">
						나다움과 함께 하루를 시작해보세요
					</p>
				</div>

				<div className="space-y-4">
					<button
						onClick={() => signIn('google', { callbackUrl: '/' })}
						className="w-full flex items-center justify-center gap-3 bg-white border border-border-strong hover:bg-gray-50 text-text-main font-medium py-4 px-6 rounded-2xl transition-all duration-200 group hover:shadow-md hover:border-border-soft"
					>
						<svg className="w-6 h-6" viewBox="0 0 24 24">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						<span className="text-lg">Google로 계속하기</span>
					</button>
				</div>

				<div className="mt-8 pt-8 border-t border-border-soft">
					<p className="text-text-muted text-sm">
						로그인하면 나다움의 <br className="md:hidden" />
						<a href="#" className="underline hover:text-text-sub">
							이용약관
						</a>{' '}
						및{' '}
						<a href="#" className="underline hover:text-text-sub">
							개인정보처리방침
						</a>
						에 동의하게 됩니다.
					</p>
				</div>
			</div>
		</div>
	)
}
