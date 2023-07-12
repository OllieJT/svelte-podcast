import { audio } from 'svelte-podcast';

// mute the current audio source
// do nothing if it's already muted
audio.mute('set');

// mute the current audio if it's unmuted
// unmute the current audio if it's muted
audio.mute('toggle');
