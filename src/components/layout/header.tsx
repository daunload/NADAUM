'use client'

import { useState } from 'react'

import { signOut, useSession } from 'next-auth/react'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { data: session } = useSession()

	return (
		<header className="bg-bg-page/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<div className="shrink-0">
						<a
							href="/"
							className="text-2xl font-bold text-text-main tracking-tight hover:opacity-80 transition-opacity"
						>
							NADAUM
						</a>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:block">
						<ul className="flex space-x-10">
							<li>
								<a
									href="/"
									className="text-main font-medium hover:text-primary transition-colors duration-200"
								>
									홈
								</a>
							</li>
							<li>
								<a
									href="/routine"
									className="text-sub font-medium hover:text-primary transition-colors duration-200"
								>
									루틴
								</a>
							</li>
							<li>
								<a
									href="/record"
									className="text-sub font-medium hover:text-primary transition-colors duration-200"
								>
									기록
								</a>
							</li>
							<li>
								<a
									href="/emotion"
									className="text-sub font-medium hover:text-primary transition-colors duration-200"
								>
									감정
								</a>
							</li>
						</ul>
					</nav>

					{/* Desktop Action Buttons / Avatar */}
					<div className="hidden md:flex items-center space-x-4">
						{session?.user && (
							<div className="flex items-center gap-3">
								<button
									onClick={() =>
										signOut({ callbackUrl: '/auth/signin' })
									}
									className="text-sm font-medium text-sub hover:text-main transition-colors"
								>
									로그아웃
								</button>
								<div className="relative w-10 h-10 rounded-full overflow-hidden border border-soft">
									{session.user.image ? (
										<img
											src={session.user.image}
											alt={session.user.name || 'User'}
											className="w-full h-full object-cover"
											referrerPolicy="no-referrer"
										/>
									) : (
										<div className="w-full h-full bg-subtle flex items-center justify-center text-muted">
											{session.user.name?.[0] || 'U'}
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden flex flex-col space-y-1.5 p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="메뉴 열기"
					>
						<span
							className={`w-6 h-0.5 bg-text-main rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
						></span>
						<span
							className={`w-6 h-0.5 bg-text-main rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
						></span>
						<span
							className={`w-6 h-0.5 bg-text-main rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
						></span>
					</button>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
				>
					<div className="py-6 space-y-6 bg-bg-page/95 backdrop-blur-xl rounded-b-3xl">
						<nav>
							<ul className="space-y-2 px-4">
								<li>
									<a
										href="/"
										className="block py-3 px-4 text-text-main font-medium rounded-xl hover:bg-subtle transition-colors duration-200"
									>
										홈
									</a>
								</li>
								<li>
									<a
										href="/routine"
										className="block py-3 px-4 text-text-main font-medium rounded-xl hover:bg-bg-subtle transition-colors duration-200"
									>
										루틴
									</a>
								</li>
								<li>
									<a
										href="/record"
										className="block py-3 px-4 text-text-main font-medium rounded-xl hover:bg-bg-subtle transition-colors duration-200"
									>
										기록
									</a>
								</li>
								<li>
									<a
										href="/emotion"
										className="block py-3 px-4 text-text-main font-medium rounded-xl hover:bg-bg-subtle transition-colors duration-200"
									>
										감정
									</a>
								</li>
							</ul>
						</nav>

						{/* Mobile Action Buttons / Avatar */}
						<div className="px-8 flex flex-col space-y-3">
							{session?.user && (
								<div className="flex items-center gap-4 py-2 border-t border-border-soft mt-2 pt-4">
									<div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-soft">
										{session.user.image ? (
											<img
												src={session.user.image}
												alt={
													session.user.name || 'User'
												}
												className="w-full h-full object-cover"
												referrerPolicy="no-referrer"
											/>
										) : (
											<div className="w-full h-full bg-bg-subtle flex items-center justify-center text-text-muted">
												{session.user.name?.[0] || 'U'}
											</div>
										)}
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-text-main">
											{session.user.name}
										</p>
										<p className="text-xs text-text-muted">
											{session.user.email}
										</p>
									</div>
									<button
										onClick={() =>
											signOut({
												callbackUrl: '/auth/signin',
											})
										}
										className="text-sm font-medium text-text-sub hover:text-text-main"
									>
										로그아웃
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
