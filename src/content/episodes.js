import { assets } from '$app/paths';

/**
 * Audio context module.
 * @module episodes
 */

export const episodes = Object.freeze({
	syntax: {
		src: `${assets}/example-syntax.mp3`,
		title: `Supper Club × Rich Harris, Author of Svelte`,
		artwork: `https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg`,
	},
	knomii: {
		src: `${assets}/example-knomii.mp3`,
		title: `Empowerment starts with letting go of control`,
		artwork: `https://ssl-static.libsyn.com/p/assets/f/a/8/d/fa8d56d5226884335f2e77a3093c12a1/ep-6.png`,
	},
	svelte: {
		src: 'https://media.transistor.fm/6d6c49e4/4cecfd0d.mp3?src=site',
		title: 'SvelteKit-superforms with Andreas Söderlund',
		artwork:
			'https://images.transistor.fm/file/transistor/images/show/12899/medium_1597678946-artwork.jpg',
	},
});
