<script lang="ts">
	import Audio from '$lib/components/audio/audio.svelte';
	import { audio, _currentTime, _duration, _paused } from '$lib/components/audio/state';

	const sources = {
		syntax: '/example-syntax.mp3',
		knomii: '/example-knomii.mp3',
	} as const;
</script>

<pre>
	{JSON.stringify($audio, null, 3)}
</pre>

<h1>Demo</h1>

<Audio on:progress={(e) => console.log(e.detail)} autoplay={false} />
<progress
	style="width: 960px; max-width:100%"
	data-paused={$_paused ? 'true' : 'false'}
	max={$_duration}
	value={$_currentTime}
/>

<h5>Load Audio</h5>
<button type="button" on:click={() => audio.load(sources['syntax'], { paused: false })}
	>Syntax</button
>
<button type="button" on:click={() => audio.load(sources['knomii'], { paused: false })}
	>Knomii</button
>
<button type="button" on:click={() => audio.unload()}>None</button>

<h5>Custom audio controls</h5>

<h6>Audio Actions</h6>

<button type="button" on:click={audio.play}>Play</button>
<button type="button" on:click={audio.pause}>Pause</button>
<button type="button" on:click={audio.toggle_pause}>Toggle</button>

<h6>Seeking</h6>

<button type="button" on:click={() => audio.seek(30)}>Go to 30s</button>
<!-- <button type="button" on:click={() => (currentTime = currentTime + 5)}>Skip 5s</button>
	<button type="button" on:click={() => (currentTime = currentTime - 5)}>Rewind 5s</button>
	<button type="button" on:click={() => (currentTime = duration - 30)}>Go to 30s before end</button> -->

<h6>Playback Rate</h6>

{#each [0.5, 1, 2, 3] as rate}
	<button type="button" on:click={() => audio.setPlaybackRate(rate)}>{rate}x</button>
{/each}

<h6>Volume</h6>

{#each [0, 0.25, 0.5, 0.75, 1] as v}
	<button type="button" on:click={() => audio.setVolume(v)}>{v * 100}%</button>
{/each}
