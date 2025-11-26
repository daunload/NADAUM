'use client'

import { Button } from '@/components/ui/button'
import Toggle from '@/components/ui/toggle'
import { Plus, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserTags } from '../hooks/use-user-tags'
import AddTagDialog from './AddTagDialog'

export default function AddTagButton({
	tags,
	onAddTags,
}: {
	tags: string[]
	onAddTags: (tags: string[]) => void
}) {
	const [open, setOpen] = useState(false)
	const { data: userTags } = useUserTags()
	const [currentTags, setCurrentTags] = useState<string[]>([])
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const [addTagOpen, setAddTagOpen] = useState(false)

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
		<div className="flex gap-2 flex-wrap">
			{currentTags &&
				currentTags.map((tag, index) => (
					<div
						className="bg-bg-subtle rounded-full px-3 py-1 text-sm text-text-main cursor-pointer hover:bg-opacity-80 transition-colors flex items-center gap-1"
						key={index}
					>
						<p>{tag}</p>
					</div>
				))}
			<div className="relative">
				<button
					onClick={() => setOpen(!open)}
					className="flex items-center gap-1 text-sm text-text-sub hover:text-text-main transition-colors px-2 py-1 rounded-md hover:bg-bg-subtle"
				>
					<Plus className="w-4 h-4" />
					<span>태그 추가</span>
				</button>
				{open && (
					<div className="absolute top-full mt-2 left-0 bg-bg-surface rounded-xl border border-border-soft shadow-xl w-[280px] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="p-2 max-h-[300px] overflow-y-auto">
							{userTags?.tags && userTags.tags.length > 0 ? (
								userTags.tags.map((tag, index) => (
									<div
										className="flex items-center justify-between px-3 py-2 hover:bg-bg-page rounded-lg cursor-pointer transition-colors group"
										key={index}
										onClick={() => onToggleTag(tag)}
									>
										<div className="flex items-center gap-2 text-text-main">
											<Tag className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
											<p>{tag}</p>
										</div>
										<Toggle
											active={selectedTags.includes(tag)}
											onClick={(e) => {
												e.stopPropagation()
												onToggleTag(tag)
											}}
										/>
									</div>
								))
							) : (
								<div className="text-center py-4 text-text-muted text-sm">
									등록된 태그가 없습니다.
								</div>
							)}
						</div>
						<div className="p-2 border-t border-border-soft bg-bg-page/50">
							<button
								className="w-full flex items-center justify-center gap-2 py-2 text-primary font-medium hover:bg-bg-surface rounded-lg transition-all shadow-sm border border-transparent hover:border-border-soft"
								onClick={() => setAddTagOpen(true)}
							>
								<Plus className="w-4 h-4" />
								<span>새 태그 만들기</span>
							</button>
						</div>
						<div className="flex gap-2 p-2 border-t border-border-soft bg-bg-surface">
							<Button
								variant="secondary"
								className="flex-1"
								size="sm"
								onClick={() => close()}
							>
								취소
							</Button>
							<Button
								variant="primary"
								className="flex-1"
								size="sm"
								onClick={() => save()}
							>
								확인
							</Button>
						</div>
					</div>
				)}
			</div>
			<AddTagDialog open={addTagOpen} onOpenChange={setAddTagOpen} />
		</div>
	)
}
