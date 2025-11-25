'use client'

import { Button } from '@/components/ui/button'
import Toggle from '@/components/ui/toggle'
import { Plus, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserTags } from '../hooks/use-user-tags'

export default function AddTagButton({ tags, onAddTags }: { tags: string[], onAddTags: (tags: string[]) => void}) {
	const [open, setOpen] = useState(false)
	const { data: userTags } = useUserTags()
	const [currentTags, setCurrentTags] = useState<string[]>([])
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	useEffect(() => {
		setCurrentTags(tags)
		setSelectedTags(tags)
	}, [tags])

	function onToggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	function close() {
		setOpen(false)
	}

	function save() {
		onAddTags(selectedTags)
		setCurrentTags(selectedTags)
		close()
	}

	return (
		<div className="flex gap-1">
			{currentTags && currentTags.map((tag, index) => (
				<div className="border rounded-lg w-fit px-2 radius-[10px] border-border-strong text-text-muted cursor-pointer" key={index}>
					<div
						className="flex items-center gap-2 justify-between"
					>
						<div className="flex items-center gap-2">
							<p>{tag}</p>
						</div>
					</div>
				</div>
			))}
			<div
				className="relative border-dashed border rounded-lg w-fit px-2 radius-[10px] border-border-strong text-text-muted cursor-pointer"
			>
				<p onClick={() => setOpen(!open)}>+ 태그</p>
				{open && (
					<div className="absolute top-full mt-3 p-3 left-[50%] translate-x-[-50%] bg-bg-surface rounded-lg w-[250px] shadow-lg">
						{userTags?.tags &&
							userTags.tags.map((tag, index) => (
								<div
									className="flex items-center gap-2 py-2 justify-between"
									key={index}
								>
									<div className="flex items-center gap-2">
										<Tag className="w-4" />
										<p>{tag}</p>
									</div>
									<Toggle
										active={selectedTags.includes(tag)}
										onClick={(e) => {
											e.stopPropagation()
											onToggleTag(tag)
										}}>
									</Toggle>
								</div>
							))}
							<div className="flex items-center gap-2 py-2 text-warning font-bold">
								<Plus className="w-4" />
								<p>새 태그 추가</p>
							</div>
						<div className="flex justify-end gap-2 w-full">
							<Button
								variant="secondary"
								className="w-[50%]"
								size="sm"
								onClick={() => close()}
							>
								취소
							</Button>
							<Button variant="primary" className="w-[50%]" size="sm" onClick={() => save()}>
								확인
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
