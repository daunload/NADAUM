'use client'

import { useState } from 'react'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className="bg-bg-surface border-b border-border-soft sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="shrink-0">
						<h1 className="text-xl font-bold text-text-main">
							MyApp
						</h1>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:block">
						<ul className="flex space-x-8">
							<li>
								<a
									href="/"
									className="text-text-main font-medium py-2 border-b-2 border-transparent hover:text-primary hover:border-primary transition-all duration-200"
								>
									홈
								</a>
							</li>
							<li>
								<a
									href="/routine"
									className="text-text-main font-medium py-2 border-b-2 border-transparent hover:text-primary hover:border-primary transition-all duration-200"
								>
									루틴
								</a>
							</li>
							<li>
								<a
									href="/record"
									className="text-text-main font-medium py-2 border-b-2 border-transparent hover:text-primary hover:border-primary transition-all duration-200"
								>
									기록
								</a>
							</li>
							<li>
								<a
									href="/emotion"
									className="text-text-main font-medium py-2 border-b-2 border-transparent hover:text-primary hover:border-primary transition-all duration-200"
								>
									감정
								</a>
							</li>
						</ul>
					</nav>

					{/* Desktop Action Buttons */}
					<div className="hidden md:flex items-center space-x-3">
						<button className="px-4 py-2 text-sm font-medium text-text-main border border-border-strong rounded-md hover:bg-bg-subtle transition-colors duration-200">
							로그인
						</button>
						<button className="px-4 py-2 text-sm font-medium text-text-inverse bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200">
							시작하기
						</button>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden flex flex-col space-y-1 p-1"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="메뉴 열기"
					>
						<span
							className={`w-6 h-0.5 bg-text-main transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
						></span>
						<span
							className={`w-6 h-0.5 bg-text-main transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}
						></span>
						<span
							className={`w-6 h-0.5 bg-text-main transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
						></span>
					</button>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 pb-6' : 'max-h-0'}`}
				>
					<div className="pt-6 border-t border-border-soft">
						<nav className="mb-6">
							<ul className="space-y-1">
								<li>
									<a
										href="/"
										className="block py-3 text-text-main font-medium border-b border-border-soft hover:text-primary transition-colors duration-200"
									>
										홈
									</a>
								</li>
								<li>
									<a
										href="/routine"
										className="block py-3 text-text-main font-medium border-b border-border-soft hover:text-primary transition-colors duration-200"
									>
										루틴
									</a>
								</li>
								<li>
									<a
										href="/record"
										className="block py-3 text-text-main font-medium border-b border-border-soft hover:text-primary transition-colors duration-200"
									>
										기록
									</a>
								</li>
								<li>
									<a
										href="/emotion"
										className="block py-3 text-text-main font-medium border-b border-border-soft hover:text-primary transition-colors duration-200"
									>
										감정
									</a>
								</li>
							</ul>
						</nav>

						{/* Mobile Action Buttons */}
						<div className="flex flex-col space-y-3">
							<button className="w-full py-3 px-4 text-text-main font-medium border border-border-strong rounded-md hover:bg-bg-subtle transition-colors duration-200">
								로그인
							</button>
							<button className="w-full py-3 px-4 text-text-inverse font-medium bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200">
								시작하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
