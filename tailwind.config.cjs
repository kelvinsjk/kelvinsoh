const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				'math-repo': {
					primary: '#191970',
					secondary: '#fedb8b',
					accent: '#37CDBE',
					neutral: '#57534e',
					'base-100': '#f3f4f6',
					info: '#38bdf8',
					success: '#4ade80',
					warning: '#fb923c',
					error: '#f87171',
				},
			},
		],
	},
	plugins: [typography, daisyui]
};

module.exports = config;
