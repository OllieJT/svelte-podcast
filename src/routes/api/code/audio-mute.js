import { audio } from 'svelte-podcast';

// mute the current audio source
audio.mute(true);

// unmute the current audio source
audio.mute(false);

// invert the mute state of the current audio source
audio.mute('toggle');
