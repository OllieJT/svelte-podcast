import { audio } from 'svelte-podcast';

// play the current audio source
audio.play(true);

// pause the current audio source
audio.play(false);

// invert the play state of the current audio source
audio.play('toggle');
