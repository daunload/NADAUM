module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Base / Background
				'bg-page': '#F5F4F1',
				'bg-surface': '#FFFFFF',
				'bg-subtle': '#DCE5D6',

				// Primary / Accent
				primary: '#E7A26E',
				accent: '#8FAACB',
				emotion: '#CDC8DF',

				// Text
				'text-main': '#4A4945',
				'text-sub': '#6B6A67',
				'text-muted': '#9A9894',
				'text-inverse': '#FFFFFF',

				// Border / Divider
				'border-soft': '#E0DFDC',
				'border-strong': '#C8C7C5',

				// State
				success: '#7BAA82',
				warning: '#E6B566',
				error: '#D57A7A',
			},
		},
	},
	plugins: [],
}
