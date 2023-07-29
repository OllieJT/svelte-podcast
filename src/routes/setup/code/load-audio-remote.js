import { audio } from 'svelte-podcast';

audio.src.load('https://media.transistor.fm/27a058c9/27b595e2.mp3', {
	title: 'Episode Title',
	artwork: '/artwork.png',
});
