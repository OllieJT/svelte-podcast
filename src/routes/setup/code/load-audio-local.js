import { audio } from 'svelte-podcast';

audio.src.load('/episode-audio.mp3', {
	title: 'Episode Title',
	artwork: '/artwork.png',
});
