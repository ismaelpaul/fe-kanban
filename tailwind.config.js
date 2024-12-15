/** @type {import('tailwindcss').Config} */

export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			tablet: '768px',
			laptop: '1440px',
			desktop: '1920px',
		},
		fontFamily: {
			jakarta: ['Plus Jakarta Sans', 'sans-serif'],
		},
		fontWeight: {
			'x-light': 200,
			light: 300,
			regular: 400,
			medium: 500,
			semiBold: 600,
			bold: 700,
			extraBold: 800,
		},
		letterSpacing: {
			'2.4px': '0.15rem',
		},
		fontSize: {
			'12px': '0.75rem',
			'13px': '0.813rem',
			body: ['0.75rem'],
			'l-body': ['0.813rem', { lineHeight: '1.438rem' }, { fontWeight: 400 }],
			's-heading': ['0.75rem', { fontWeight: '600' }],
			'm-heading': ['0.938rem', { fontWeight: '600' }],
			'l-heading': ['1.125rem', { fontWeight: '600' }],
		},
		colors: {
			black: '#000112',
			white: '#FFFFFF',
			'dark-bg': '#20212C',
			'dark-grey': '#2B2C37',
			'lines-dark': '#3E3F4E',
			'medium-grey': '#828FA3',
			'lines-light': '#E4EBFA',
			'light-bg': '#F4F7FD',
			purple: '#635FC7',
			'purple-hover': '#A8A4FF',
			red: '#EA5555',
			'red-hover': '#FF9898',
			'blue-dot': '#49C4E5',
			'purple-dot': '#8471F2',
			'green-dot': '#67E2AE',
			'github-bg': '#24292e',
			'google-bg': '#dd4b39',
			linear: '#E9EFFA',
			success: '#53D768',
			warning: '#FFD600',
			error: '#EA5555',
			'task-completion': '#03ae03',
			'dark-task-completion': '#51ef98',
		},
		extend: {
			dropShadow: {
				card: '0px 4px 6px rgba(54,78,126,0.11)',
			},
		},
	},
	plugins: [],
};
