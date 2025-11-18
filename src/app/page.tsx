import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import LoginButton from '@/components/LoginButton'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
	const session = await getServerSession(authOptions)

	if (!session) redirect('/api/auth/signin')

	return (
		<main>
			<h1>NADAUM</h1>
			<LoginButton />
		</main>
	)
}
