import { audio } from 'svelte-podcast';

// play the current audio source
// do nothing if it's already playing
audio.play('set');

// play the current audio if it's paused
// pause the current audio if it's playing
audio.play('toggle');
