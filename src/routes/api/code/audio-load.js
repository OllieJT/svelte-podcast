import { audio } from 'svelte-podcast';

// load a new audio source into the player
audio.src.load(
	// path to audio file
	'/episode-377.mp3',

	// custom metadata defined by you
	{
		title: 'Supper Club × Rich Harris, Author of Svelte',
		artwork:
			'https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg',
		guests: ['Rich Harris'],
		hosts: ['Wes Bos', 'Scott Tolinski'],
	},

	// autoplay
	false,
);

// unload the current audio source
audio.src.unload();
