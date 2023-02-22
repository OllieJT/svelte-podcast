<script lang="ts">
	import Audio from '$lib/components/audio.svelte';

	const sources = {
		syntax: '/example-syntax.mp3',
		knomii: '/example-knomii.mp3'
	} as const;

	let playbackRate = 1;
	let volume = 0.5;
	let paused = true;
	let currentTime = 0;
	let src = '';
</script>

<h1>Demo</h1>

<h5>Native audio controls</h5>
<Audio
	on:progress={(e) => console.log(e.detail)}
	{src}
	autoplay={false}
	{volume}
	{playbackRate}
	{paused}
	bind:currentTime
	let:duration
>
	<progress
		style="width: 800px; max-width:100%"
		data-paused={paused ? 'true' : 'false'}
		max={duration}
		value={currentTime}
	/>

	<h5>Load Audio</h5>
	<button type="button" on:click={() => (src = sources['syntax'])}>Syntax</button>
	<button type="button" on:click={() => (src = sources['knomii'])}>Knomii</button>
	<button type="button" on:click={() => (src = '')}>None</button>

	<h5>Custom audio controls</h5>

	<h6>Audio Actions</h6>

	<button type="button" on:click={() => (paused = false)}>Play</button>
	<button type="button" on:click={() => (paused = true)}>Pause</button>
	<button type="button" on:click={() => (paused = !paused)}>Toggle</button>

	<h6>Seeking</h6>

	<button type="button" on:click={() => (currentTime = currentTime + 5)}>Skip 5s</button>
	<button type="button" on:click={() => (currentTime = currentTime - 5)}>Rewind 5s</button>
	<button type="button" on:click={() => (currentTime = 30)}>Go to 30s</button>
	<button type="button" on:click={() => (currentTime = duration - 30)}>Go to 30s before end</button>

	<h6>Playback Rate</h6>

	{#each [0.5, 1, 2, 3] as rate}
		<button type="button" on:click={() => (playbackRate = rate)}>{rate}x</button>
	{/each}

	<h6>Volume</h6>

	{#each [0, 0.25, 0.5, 0.75, 1] as v}
		<button type="button" on:click={() => (volume = v)}>{v * 100}%</button>
	{/each}
</Audio>
