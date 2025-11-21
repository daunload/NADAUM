import Header from '@/components/layout/header'
import './globals.css'
import { Providers } from './provider'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ko">
			<body className="bg-bg-page text-text-main h-screen flex flex-col">
				<Providers>
					<Header></Header>
					<div className="flex-1">
						<div className="max-w-7xl mx-auto px-6 md:px-8">
							<div className="grid grid-cols-12 gap-6">
								<div className="col-span-12">
									<div className="space-y-12 md:space-y-16">
										{children}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
