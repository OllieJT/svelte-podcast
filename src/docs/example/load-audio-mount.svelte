<script>
	import { onMount } from 'svelte';
	import { episode_audio } from 'svelte-podcast';

	onMount(() => {
		// load the episode on mount without any metadata
		episode_audio.load('/episode-audio.mp3', {
			/* optional metadata */
		});
	});
</script>
