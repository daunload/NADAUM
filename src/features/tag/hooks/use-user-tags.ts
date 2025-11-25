import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export function useAddTag() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (tag: string) => {
			const res = await fetch('/api/tags', {
				method: 'POST',
				body: JSON.stringify({ tag }),
			})
			if (!res.ok) {
				const error = await res.json()
				throw new Error(error.error || 'Failed to add tag')
			}
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', 'tags'] })
		},
	})
}
