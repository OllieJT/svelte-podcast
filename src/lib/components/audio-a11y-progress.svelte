<script lang="ts">
	export let currentTime: number;
	export let paused: boolean;
	export let duration: number;
</script>

<progress
	class="svelte-podcast-a11y-hidden"
	data-paused={paused ? 'true' : 'false'}
	max={duration}
	value={currentTime}
/>

<style>
	.svelte-podcast-a11y-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
