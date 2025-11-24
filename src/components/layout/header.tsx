'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { data: session } = useSession()
	const pathname = usePathname()

	const navItems = [
		{ label: '투두', href: '/todo' },
		{ label: '대시보드', href: '/dashboard' },
		{ label: '캘린더', href: '/calendar' },
	]

	return (
		<header className="bg-bg-page/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b border-border-soft/50">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo & Desktop Nav */}
					<div className="flex items-center gap-12">
						<div className="shrink-0">
							<Link
								href="/"
								className="text-2xl font-bold text-text-main tracking-tight hover:opacity-80 transition-opacity"
							>
								NADAUM
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-1">
							{navItems.map((item) => {
								const isActive = pathname === item.href
								return (
									<Link
										key={item.href}
										href={item.href}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
											isActive
												? 'bg-bg-subtle text-text-main'
												: 'text-text-sub hover:text-text-main hover:bg-bg-subtle/50'
										}`}
									>
										{item.label}
									</Link>
								)
							})}
						</nav>
					</div>

					{/* Desktop Action Buttons / Avatar */}
					<div className="hidden md:flex items-center space-x-4">
						{session?.user && (
							<div className="flex items-center gap-3">
								<button
									onClick={() =>
										signOut({ callbackUrl: '/auth/signin' })
									}
									className="text-sm font-medium text-text-sub hover:text-text-main transition-colors"
								>
									로그아웃
								</button>
								<div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-soft">
									{session.user.image ? (
										<img
											src={session.user.image}
											alt={session.user.name || 'User'}
											className="w-full h-full object-cover"
											referrerPolicy="no-referrer"
										/>
									) : (
										<div className="w-full h-full bg-bg-subtle flex items-center justify-center text-text-muted">
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
					className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
				>
					<div className="py-6 space-y-6 bg-bg-page/95 backdrop-blur-xl rounded-b-3xl border-t border-border-soft/50">
						<nav>
							<ul className="space-y-2 px-4">
								{navItems.map((item) => {
									const isActive = pathname === item.href
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={`block py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
													isActive
														? 'bg-bg-subtle text-text-main'
														: 'text-text-sub hover:bg-bg-subtle/50 hover:text-text-main'
												}`}
												onClick={() =>
													setIsMenuOpen(false)
												}
											>
												{item.label}
											</Link>
										</li>
									)
								})}
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
