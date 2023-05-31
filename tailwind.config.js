/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,css,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['light', 'dark']
	},
	plugins: [require('daisyui')]
};
