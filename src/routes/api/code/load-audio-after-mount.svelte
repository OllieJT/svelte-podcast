<script>
	import { onMount } from 'svelte';
	import { audio } from 'svelte-podcast';

	onMount(() => {
		// load the episode on mount without any metadata
		audio.src.load('/episode-audio.mp3', {
			/* optional metadata */
		});
	});
</script>
