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
			<DialogContent className="sm:max-w-[400px] bg-bg-surface border-border-soft shadow-xl p-0 gap-0 overflow-hidden">
				<DialogHeader className="p-6 pb-2">
					<DialogTitle className="text-xl font-bold text-text-main">새 태그 추가</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="p-6 pt-2">
						<Input
							id="tag"
							placeholder="태그 이름을 입력하세요"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							autoFocus
							className="focus-visible:ring-primary"
						/>
					</div>
					<DialogFooter className="bg-bg-page/50 p-4 border-t border-border-soft gap-2 sm:gap-0">
						<div className="flex w-full gap-2">
							<Button
								type="button"
								variant="secondary"
								onClick={() => onOpenChange(false)}
								className="flex-1"
							>
								취소
							</Button>
							<Button 
								type="submit" 
								variant="primary" 
								disabled={!tag.trim() || isPending}
								className="flex-1"
							>
								{isPending ? '추가 중...' : '추가'}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
