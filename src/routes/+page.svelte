<script lang="ts">
	import { audio, episode_progress, type AudioLoadData } from '$lib';

	const sources = {
		syntax: {
			src: `/example-syntax.mp3`,
			title: `Supper Club × Rich Harris, Author of Svelte`,
			artwork: `https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg`,
		},
		knomii: {
			src: `/example-knomii.mp3`,
			title: `Empowerment starts with letting go of control`,
			artwork: `https://ssl-static.libsyn.com/p/assets/f/a/8/d/fa8d56d5226884335f2e77a3093c12a1/ep-6.png`,
		},
	} satisfies Record<string, AudioLoadData>;

	let current_time = 0;
	$: current_time = $audio.current_time;
</script>

<pre>{JSON.stringify($audio, null, 3)}</pre>

<h1>Demo</h1>
<a href="/another-page">Another Page</a>
<button type="button" on:click={episode_progress.save_all}>save</button>

<h5>Load Audio</h5>
<button
	type="button"
	on:click={() => audio.load(sources['syntax'], { autoplay: true, start_at: 45 })}>Syntax</button
>
<button type="button" on:click={() => audio.load(sources['knomii'], { autoplay: false })}
	>Knomii</button
>
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
