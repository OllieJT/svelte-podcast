import { audio } from 'svelte-podcast';

// pause the current audio source
// do nothing if it's already paused
audio.pause('set');

// pause the current audio if it's playing
// play the current audio if it's paused
audio.pause('toggle');
