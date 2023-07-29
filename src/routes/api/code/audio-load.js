import { audio } from 'svelte-podcast';

// load a new audio source into the player
audio.src.load(
	// path to audio file
	'/episode-377.mp3',

	// custom metadata defined by you
	{
		title: 'Supper Club × Rich Harris, Author of Svelte',
		guests: ['Rich Harris'],
		hosts: ['Wes Bos', 'Scott Tolinski'],
	},

	// autoplay
	false,
);

// unload the current audio source
audio.src.unload();
