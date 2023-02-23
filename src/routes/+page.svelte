<script lang="ts">
	import { audio } from '$lib/components/audio';

	const sources = {
		syntax: '/example-syntax.mp3',
		knomii: '/example-knomii.mp3',
	} as const;

	let current_time = 0;
	$: current_time = $audio.current_time;
</script>

<pre>{JSON.stringify($audio, null, 3)}</pre>

<h1>Demo</h1>
<a href="/another-page">Another Page</a>

<h5>Load Audio</h5>
<button type="button" on:click={() => audio.load(sources['syntax'])}>Syntax</button>
<button type="button" on:click={() => audio.load(sources['knomii'])}>Knomii</button>
<button type="button" on:click={() => audio.unload()}>None</button>

<h5>Custom audio controls</h5>

<h6>Play / Pause Actions</h6>

<button type="button" on:click={() => audio.play()}>Play</button>
<button type="button" on:click={() => audio.pause()}>Pause</button>
<button type="button" on:click={() => audio.pause('toggle')}>Toggle</button>

<h6>Audio Actions</h6>

<button type="button" on:click={() => audio.mute()}>Mute</button>
<button type="button" on:click={() => audio.unmute()}>Unmute</button>
<button type="button" on:click={() => audio.mute('toggle')}>Toggle</button>

<h6>Seeking</h6>

<input
	type="range"
	min={0}
	max={$audio.duration}
	style="width:100%"
	bind:value={current_time}
	on:change={(e) => audio.seek(parseInt(e.currentTarget.value))}
/>

<button type="button" on:click={() => audio.seek(30)}>Go to 30s from start </button>
<button type="button" on:click={() => audio.seek(30, 'from-end')}>Go to 30s from end</button>
<button type="button" on:click={() => audio.skip(10, 'forward')}>Skip 10s</button>
<button type="button" on:click={() => audio.skip(10, 'backward')}>Rewind 10s</button>

<h6>Playback Rate</h6>

{#each [0.5, 1, 2, 3] as rate}
	<button type="button" on:click={() => audio.setPlaybackRate(rate)}>{rate}x</button>
{/each}
