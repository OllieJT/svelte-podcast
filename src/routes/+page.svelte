<script lang="ts">
	import { episode_audio, episode_progress, user_preferences, user_progress } from '$lib';
	import AudioProgress from '$lib/components/headless/progress/playhead.svelte';
	import { PodcastPlayer } from '$lib/components/player';
	import PlayerProgress from '$lib/components/player/player-timestamp.svelte';

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
	} as const;

	let current_time = 0;
	$: current_time = $episode_progress.current_time;
</script>

<PlayerProgress />

<pre>{JSON.stringify(
		{
			$episode_audio,
			$episode_progress,
			$user_preferences,
		},
		null,
		3,
	)}</pre>

<h1>Demo</h1>
<a href="/another-page">Another Page</a>
<button type="button" on:click={user_progress.clear}>Clear progress for all episodes</button>
<button type="button" on:click={user_preferences.clear}>Clear all preferences</button>

<h5>Load Audio</h5>
<button type="button" on:click={() => episode_audio.load(sources['syntax'].src, sources['knomii'])}
	>Syntax</button
>
<button type="button" on:click={() => episode_audio.load(sources['knomii'].src, sources['knomii'])}
	>Knomii</button
>
<button type="button" on:click={() => episode_audio.unload()}>None</button>

<h5>Custom audio controls</h5>

<h6>Play / Pause Actions</h6>

<button type="button" on:click={() => episode_audio.play()}>Play</button>
<button type="button" on:click={() => episode_audio.pause()}>Pause</button>
<button type="button" on:click={() => episode_audio.pause('toggle')}>Toggle</button>

<h6>Audio Actions</h6>

<button type="button" on:click={() => episode_audio.mute()}>Mute</button>
<button type="button" on:click={() => episode_audio.unmute()}>Unmute</button>
<button type="button" on:click={() => episode_audio.mute('toggle')}>Toggle</button>

<h6>Seeking</h6>

<AudioProgress />

<button type="button" on:click={() => episode_audio.seek(30)}>Go to 30s from start </button>
<button type="button" on:click={() => episode_audio.seek(30, 'from-end')}>Go to 30s from end</button
>
<button type="button" on:click={() => episode_audio.skip(10, 'forward')}>Skip 10s</button>
<button type="button" on:click={() => episode_audio.skip(10, 'backward')}>Rewind 10s</button>

<h6>Playback Rate</h6>

{#each [0.5, 1, 2, 3] as rate}
	<button type="button" on:click={() => user_preferences.set.playback_rate(rate)}>
		{rate}x
	</button>
{/each}

<hr />

<PodcastPlayer />
