import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className = '', error = false, helperText, ...props }, ref) => {
		const baseStyles =
			'w-full h-[44px] px-4 bg-white border rounded-[12px] text-[15px] text-text-main placeholder:text-text-muted transition-all duration-200 outline-none'

		const stateStyles = error
			? 'border-error focus:border-error focus:shadow-[0_0_0_2px_rgba(213,122,122,0.1)]'
			: 'border-border-soft focus:border-accent focus:shadow-[0_0_0_2px_rgba(143,170,203,0.1)]'

		return (
			<div className="w-full">
				<input
					ref={ref}
					className={`${baseStyles} ${stateStyles} ${className}`}
					{...props}
				/>
				{helperText && (
					<p
						className={`mt-1.5 text-[13px] ${
							error ? 'text-error' : 'text-text-muted'
						}`}
					>
						{helperText}
					</p>
				)}
			</div>
		)
	},
)

Input.displayName = 'Input'

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean
	helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className = '', error = false, helperText, ...props }, ref) => {
		const baseStyles =
			'w-full p-4 bg-white border rounded-[12px] text-[15px] text-text-main placeholder:text-text-muted transition-all duration-200 outline-none min-h-[120px] resize-y'

		const stateStyles = error
			? 'border-error focus:border-error focus:shadow-[0_0_0_2px_rgba(213,122,122,0.1)]'
			: 'border-border-soft focus:border-accent focus:shadow-[0_0_0_2px_rgba(143,170,203,0.1)]'

		return (
			<div className="w-full">
				<textarea
					ref={ref}
					className={`${baseStyles} ${stateStyles} ${className}`}
					{...props}
				/>
				{helperText && (
					<p
						className={`mt-1.5 text-[13px] ${
							error ? 'text-error' : 'text-text-muted'
						}`}
					>
						{helperText}
					</p>
				)}
			</div>
		)
	},
)

Textarea.displayName = 'Textarea'
