'use client'

import { Button } from '@/components/ui/button'
import { Tag } from 'lucide-react'
import { useState } from 'react'
import { useUserTags } from '../hooks/use-user-tags'

export default function AddTagButton() {
	const [open, setOpen] = useState(false)
	const { data: userTags } = useUserTags()
	console.log(userTags)

	return (
		<div
			onClick={() => setOpen(!open)}
			className="relative border-dashed border rounded-lg w-fit px-2 radius-[10px] border-border-strong text-text-muted cursor-pointer"
		>
			<p>+ 태그</p>
			{open && (
				<div className="absolute top-full mt-3 p-3 left-[50%] translate-x-[-50%] bg-bg-surface rounded-lg w-[250px] shadow-lg">
					{userTags?.tags &&
						userTags.tags.map((tag, index) => (
							<div
								className="flex items-center gap-2"
								key={index}
							>
								<Tag />
								<p>{tag}</p>
							</div>
						))}
					<div className="flex justify-end gap-2 w-full">
						<Button
							variant="secondary"
							className="w-[50%]"
							size="sm"
						>
							취소
						</Button>
						<Button variant="primary" className="w-[50%]" size="sm">
							확인
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
