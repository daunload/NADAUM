import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	noPadding?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className = '', noPadding = false, children, ...props }, ref) => {
		const baseStyles =
			'bg-bg-surface border border-border-soft rounded-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.03)]'
		const paddingStyles = noPadding ? '' : 'p-6 md:p-8'

		return (
			<div
				ref={ref}
				className={`${baseStyles} ${paddingStyles} ${className}`}
				{...props}
			>
				{children}
			</div>
		)
	},
)

Card.displayName = 'Card'

export const CardHeader = ({
	className = '',
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`mb-4 ${className}`} {...props}>
		{children}
	</div>
)

export const CardTitle = ({
	className = '',
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h3
		className={`text-[18px] font-medium leading-relaxed text-text-main ${className}`}
		{...props}
	>
		{children}
	</h3>
)

export const CardContent = ({
	className = '',
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`text-[15px] text-text-sub leading-relaxed ${className}`} {...props}>
		{children}
	</div>
)

export const CardFooter = ({
	className = '',
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`mt-6 flex items-center ${className}`} {...props}>
		{children}
	</div>
)
