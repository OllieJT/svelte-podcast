import { audio } from 'svelte-podcast';

audio.src.load(
	// Audio file
	'/episode-audio.mp3',

	// Your custom metadata
	{
		title: 'A deep dive into Svelte Podcast',
		artwork: '/artwork.png',
		guest_name: 'OllieJT',
	},
);
