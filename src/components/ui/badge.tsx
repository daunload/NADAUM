import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: 'default' | 'primary' | 'accent' | 'emotion'
	selected?: boolean
	interactive?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			className = '',
			variant = 'default',
			selected = false,
			interactive = false,
			children,
			onClick,
			...props
		},
		ref,
	) => {
		const baseStyles =
			'inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200'

		const interactiveStyles = interactive
			? 'cursor-pointer hover:opacity-80 active:scale-95'
			: ''

		// Default unselected state
		const unselectedStyle = 'bg-[#F0EEF4] text-text-main'

		// Selected states
		const selectedStyles = {
			default: 'bg-text-main text-text-inverse',
			primary: 'bg-primary text-text-inverse shadow-sm',
			accent: 'bg-accent text-text-inverse shadow-sm',
			emotion: 'bg-emotion text-text-inverse shadow-sm',
		}

		const classes = [
			baseStyles,
			interactiveStyles,
			selected ? selectedStyles[variant] : unselectedStyle,
			className,
		]
			.filter(Boolean)
			.join(' ')

		return (
			<span
				ref={ref}
				className={classes}
				onClick={interactive ? onClick : undefined}
				{...props}
			>
				{children}
			</span>
		)
	},
)

Badge.displayName = 'Badge'
