import { audio } from 'svelte-podcast';

// go to 200 seconds from the start
audio.seek_to(200);

// go to 200 seconds before the end
audio.seek_to(200, 'from-end');
