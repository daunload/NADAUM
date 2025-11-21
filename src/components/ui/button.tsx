import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'text'
	size?: 'sm' | 'md' | 'lg'
	fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className = '',
			variant = 'primary',
			size = 'md',
			fullWidth = false,
			disabled,
			children,
			...props
		},
		ref,
	) => {
		const baseStyles =
			'inline-flex items-center justify-center rounded-[12px] font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed'

		const variants = {
			primary:
				'bg-primary text-text-inverse hover:opacity-90 active:opacity-100 active:shadow-none disabled:bg-border-soft disabled:text-text-muted shadow-sm',
			secondary:
				'bg-transparent border border-border-soft text-text-main hover:bg-bg-subtle/20 disabled:border-border-soft disabled:text-text-muted',
			text: 'bg-transparent text-accent hover:opacity-80 disabled:text-text-muted',
		}

		const sizes = {
			sm: 'h-[36px] px-4 text-[14px]',
			md: 'h-[44px] px-6 text-[15px]',
			lg: 'h-[48px] px-8 text-[16px]',
		}

		const widthStyles = fullWidth ? 'w-full' : ''

		const classes = [
			baseStyles,
			variants[variant],
			sizes[size],
			widthStyles,
			className,
		]
			.filter(Boolean)
			.join(' ')

		return (
			<button
				ref={ref}
				className={classes}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		)
	},
)

Button.displayName = 'Button'
