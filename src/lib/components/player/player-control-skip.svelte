<script lang="ts">
	import { episode_audio } from '$lib/audio';

	export let type: 'forward' | 'backward';
	export let seconds: number;
</script>

<button on:click={() => episode_audio.skip(seconds, type)}>
	<span> {seconds} </span>
</button>
