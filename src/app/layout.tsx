import Header from '@/components/layout/header'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './provider'

export const metadata: Metadata = {
	title: 'NADAUM',
	description: '나다움과 함께 하루를 시작해보세요',
	openGraph: {
		images: '/images/nadaum.jpg',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ko">
			<head>
				<link
					rel="stylesheet"
					as="style"
					crossOrigin="anonymous"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
				/>
			</head>
			<body className="font-sans bg-bg-page text-text-main h-screen flex flex-col">
				<Providers>
					<Header></Header>
					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-6 md:px-8 h-full">
							<div className="space-y-12 md:space-y-16 h-full">
								{children}
							</div>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
