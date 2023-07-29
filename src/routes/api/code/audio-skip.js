import { audio } from 'svelte-podcast';

// skip forward 30 seconds from the current position
audio.skip_by(30);

// skip backward 30 seconds from the current position
audio.skip_by(30, 'backward');
