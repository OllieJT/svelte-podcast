import { audio } from 'svelte-podcast';

// skip forward 30 seconds from the current position
audio.skip(30);

// skip backward 30 seconds from the current position
audio.skip(30, 'backward');
