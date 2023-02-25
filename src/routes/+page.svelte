<script lang="ts">
	import {
		podcast_audio,
		podcast_data,
		podcast_duration,
		podcast_loading,
		podcast_muted,
		podcast_options,
		podcast_paused,
		podcast_preferences,
		podcast_progress,
		podcast_time,
		save_podcast_state,
	} from '$lib';
	import type { AudioLoadData } from '$lib/types';

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
	$: current_time = $podcast_time.current_time;
</script>

<pre>{JSON.stringify(
		{
			podcast_time,
			podcast_data,
			podcast_options,
			podcast_duration,
			podcast_loading,
			podcast_paused,
			podcast_muted,
			podcast_preferences,
			podcast_progress,
		},
		null,
		3,
	)}</pre>

<h1>Demo</h1>
<a href="/another-page">Another Page</a>
<button type="button" on:click={podcast_progress.save_all}>Save progress</button>
<button type="button" on:click={podcast_preferences.save}>Save preferences</button>
<button type="button" on:click={save_podcast_state}>Save state (all)</button>

<h5>Load Audio</h5>
<button
	type="button"
	on:click={() => podcast_audio.load(sources['syntax'], { autoplay: true, start_at: 45 })}
	>Syntax</button
>
<button type="button" on:click={() => podcast_audio.load(sources['knomii'], { autoplay: false })}
	>Knomii</button
>
<button type="button" on:click={() => podcast_audio.unload()}>None</button>

<h5>Custom audio controls</h5>

<h6>Play / Pause Actions</h6>

<button type="button" on:click={() => podcast_audio.play()}>Play</button>
<button type="button" on:click={() => podcast_audio.pause()}>Pause</button>
<button type="button" on:click={() => podcast_audio.pause('toggle')}>Toggle</button>

<h6>Audio Actions</h6>

<button type="button" on:click={() => podcast_audio.mute()}>Mute</button>
<button type="button" on:click={() => podcast_audio.unmute()}>Unmute</button>
<button type="button" on:click={() => podcast_audio.mute('toggle')}>Toggle</button>

<h6>Seeking</h6>

<input
	type="range"
	min={0}
	max={$podcast_duration}
	style="width:100%"
	bind:value={current_time}
	on:change={(e) => podcast_audio.seek(parseInt(e.currentTarget.value))}
/>

<button type="button" on:click={() => podcast_audio.seek(30)}>Go to 30s from start </button>
<button type="button" on:click={() => podcast_audio.seek(30, 'from-end')}>Go to 30s from end</button
>
<button type="button" on:click={() => podcast_audio.skip(10, 'forward')}>Skip 10s</button>
<button type="button" on:click={() => podcast_audio.skip(10, 'backward')}>Rewind 10s</button>

<h6>Playback Rate</h6>

{#each [0.5, 1, 2, 3] as rate}
	<button type="button" on:click={() => podcast_preferences.set({ playback_rate: rate })}
		>{rate}x</button
	>
{/each}
