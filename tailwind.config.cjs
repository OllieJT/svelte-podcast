const colors = require('tailwindcss/colors');

const config = {
	content: [
		'./src/**/*.{html,js,md,mdx,svx,svelte,ts}',
		'./node_modules/svhighlight/**/*.svelte',
	],

	theme: {
		extend: {
			colors: {
				mono: colors.slate,
				primary: colors.orange,
			},
			transitionTimingFunction: {
				smooth: 'cubic-bezier(0, 0, 0, 1.5)',
				whip: `cubic-bezier(0.8, 0.3, 0.15, 1.1)`,
			},
		},
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

module.exports = config;
