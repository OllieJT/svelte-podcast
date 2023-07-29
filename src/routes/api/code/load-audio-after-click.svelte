<script>
	import { audio } from 'svelte-podcast';
</script>

<!-- load the episode on click -->
<button
	on:click={() =>
		audio.src.load('/episode-audio.mp3', {
			/* optional metadata */
		})}
>
	Load Episode
</button>

<!-- unload the episode on click -->
<button on:click={() => audio.src.unload()}>Unload Episode</button>
