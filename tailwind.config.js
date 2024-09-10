/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#FF204E',
				primaryDark: '#db0035',
				background: '#232332',
				landingUnlockBackground: '#121212',
				landingUnlockPrimary: '#121212',
				landingLockLeftBackground: '#db0035',
				landingLockRightBackground: '#aaaaaa',

				brand: {
					light: '#FBF8F3',
					dark: '#232332',
					purple: '#7928CA',
					pink: '#FF0080',
				},
				blue: {
					lighter: '#71C5EE',
					light: '#3182CE',
					normal: '#025091',
				},
				card: {
					dark: '#FFFFFF0A',
					light: '#FFFFFFCC',
				},
				badge: {
					dark: '#E2E8F029',
					light: '#F8F0E3',
				},
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-back': 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			backgroundImage: {
				inherited: 'inherit',
			},
		},
	},

	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.flex-center': {
					display: 'flex',
					'align-items': 'center',
					'justify-content': 'center',
				},
			})
		},
	],
}
