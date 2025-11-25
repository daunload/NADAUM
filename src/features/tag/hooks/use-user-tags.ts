import { useQuery } from '@tanstack/react-query'

export function useUserTags() {
	return useQuery({
		queryKey: ['user', 'tags'],
		queryFn: async () => {
			const res = await fetch('/api/tags')
			if (!res.ok) throw new Error('Failed to fetch tags')
			return res.json() as Promise<{ tags: string[] }>
		},
	})
}
