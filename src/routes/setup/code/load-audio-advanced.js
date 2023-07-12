import { audio } from 'svelte-podcast';

audio.load('/episode-audio.mp3');

audio.load(
	'https://media.transistor.fm/27a058c9/27b595e2.mp3',
	{
		title: 'SvelteKit-superforms with Andreas Söderlund',
		artwork:
			'https://images.transistor.fm/file/transistor/images/show/12899/medium_1597678946-artwork.jpg',
		guest_name: 'Andreas Söderlund',
	},
	false,
);
