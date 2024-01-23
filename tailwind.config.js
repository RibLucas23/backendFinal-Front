/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'login-bg':
					' linear-gradient(0deg, rgba(119,82,214,1) 0%, rgba(150,111,219,1) 33%, rgba(157,89,242,1) 100%)',
				'page-bg':
					'linear-gradient(179.81deg, #000122 16.04%, #111928 79.4%)',
				custom: "url('/banner.png')",
			},
		},
	},
	plugins: [],
};
