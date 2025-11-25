'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useAddTag } from '../hooks/use-user-tags'

interface AddTagDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function AddTagDialog({ open, onOpenChange }: AddTagDialogProps) {
	const [tag, setTag] = useState('')
	const { mutate: addTag, isPending } = useAddTag()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!tag.trim()) return

		addTag(tag, {
			onSuccess: () => {
				setTag('')
				onOpenChange(false)
			},
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>새 태그 추가</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4">
					<div className="grid gap-2">
						<Input
							id="tag"
							placeholder="태그 이름을 입력하세요"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							autoFocus
						/>
					</div>
					<DialogFooter>
						<Button
							variant="secondary"
							onClick={() => onOpenChange(false)}
						>
							취소
						</Button>
						<Button type="submit" variant="primary" disabled={!tag.trim() || isPending}>
							{isPending ? '추가 중...' : '추가'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
