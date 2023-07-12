import { audio } from 'svelte-podcast';

// unmute the current audio source
// do nothing if it's already unmuted
audio.unmute('set');

// unmute the current audio if it's muted
// mute the current audio if it's unmuted
audio.unmute('toggle');
