import { audio } from 'svelte-podcast';

// load a new audio source
audio.load(
	// path to audio file
	'/episode-377.mp3',

	// custom metadata
	{
		title: 'Supper Club × Rich Harris, Author of Svelte',
		guests: ['Rich Harris'],
		hosts: ['Wes Bos', 'Scott Tolinski'],
	},

	// autoplay
	true,
);
