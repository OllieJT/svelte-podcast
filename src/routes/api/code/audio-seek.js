import { audio } from 'svelte-podcast';

// go to 200 seconds from the start
audio.seek(200);

// go to 200 seconds before the end
audio.seek(200, 'from-end');
