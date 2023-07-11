<script>
	import PlayerStack from '$src/components/example-player/player-stack.svelte';
	import PlayerWidget from '$src/components/example-player/player-widget.svelte';
	import { Section } from '$src/content/components';
	import { episodes } from '$src/content/episodes';
	import PreviewComponent from '$src/layout/preview-component.svelte';
	import PreviewDataCode from '$src/layout/preview-data-code.svelte';
	import PreviewData from '$src/layout/preview-data.svelte';
	import {
		episode_audio,
		episode_progress,
		user_preferences,
		user_progress,
	} from 'svelte-podcast';

	$: console.log('details :: ', $episode_audio?.details);

	$: player_widget = {
		current_time: true,
		playback_rate: true,
		duration: true,
		skip_back: 10,
		skip_forward: 30,
	};

	$: player_stack = {
		playback_rate: true,
		timestamps: true,
		skip_back: 10,
		skip_forward: 30,
	};

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<Section>
	<div class="flex flex-col items-stretch space-y-6">
		<h1>This page is a work in progress</h1>
	</div>
</Section>

<Section>
	<PreviewComponent name="PlayerWidget">
		<svelte:fragment slot="options">
			<div>
				<label for="pw_current_time">current_time</label>
				<input
					id="pw_current_time"
					type="checkbox"
					bind:checked={player_widget.current_time}
				/>
			</div>
			<div>
				<label for="pw_playback_rate">playback_rate</label>
				<input
					id="pw_playback_rate"
					type="checkbox"
					bind:checked={player_widget.playback_rate}
				/>
			</div>
			<div>
				<label for="pw_duration">duration</label>
				<input
					id="pw_duration"
					type="checkbox"
					bind:checked={player_widget.duration}
				/>
			</div>
			<div>
				<label for="pw_skip_back">skip_back</label>
				<input
					id="pw_skip_back"
					type="number"
					bind:value={player_widget.skip_back}
				/>
			</div>
			<div>
				<label for="pw_skip_forward">skip_forward</label>
				<input
					id="pw_skip_forward"
					type="number"
					bind:value={player_widget.skip_forward}
				/>
			</div>
		</svelte:fragment>

		<PlayerWidget src={audio_src} include={player_widget} />
	</PreviewComponent>
</Section>

<Section>
	<PreviewComponent name="PlayerStack">
		<svelte:fragment slot="options">
			<div>
				<label for="pw_playback_rate">playback_rate</label>
				<input
					id="pw_playback_rate"
					type="checkbox"
					bind:checked={player_stack.playback_rate}
				/>
			</div>
			<div>
				<label for="pw_timestamps">timestamps</label>
				<input
					id="pw_timestamps"
					type="checkbox"
					bind:checked={player_stack.timestamps}
				/>
			</div>
			<div>
				<label for="pw_skip_back">skip_back</label>
				<input
					id="pw_skip_back"
					type="number"
					bind:value={player_stack.skip_back}
				/>
			</div>
			<div>
				<label for="pw_skip_forward">skip_forward</label>
				<input
					id="pw_skip_forward"
					type="number"
					bind:value={player_stack.skip_forward}
				/>
			</div>
		</svelte:fragment>

		<PlayerStack src={audio_src} class="max-w-sm" include={player_stack} />
	</PreviewComponent>
</Section>

<Section>
	<div class="prose prose-lg prose-slate">
		<h2>Data</h2>
		<p>
			The following are the stores that are available to you based on the
			active episode being played in the above examples.
		</p>
		<PreviewData name="episode_audio" data={episode_audio}>
			<PreviewDataCode
				code={`episode_audio.subscribe()`}
				description="subscribes to the episode_audio data"
			/>
			<PreviewDataCode
				code={`episode_audio.load(\n\tsrc: string,\n\tdetails: { [key: string]: string | number | boolean] }\n)`}
				description="loads an episode into the player"
			/>
			<PreviewDataCode
				code={`episode_audio.load(src: string, details: { [key: string]: string | number | boolean] })`}
				description="loads an episode into the player"
			/>
			<PreviewDataCode
				code={`episode_audio.unload()`}
				description="unloads the episode from the player"
			/>
			<PreviewDataCode
				code={`episode_audio.seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start')`}
				description="seeks to a specific part of the audio"
			/>
			<PreviewDataCode
				code={`episode_audio.skip(seconds: number, type: 'forward' | 'backward' = 'forward')`}
				description="seeks forward or backward relative to the current time"
			/>
			<PreviewDataCode
				code={`episode_audio.play(action: "toggle" | "set" = "set")`}
				description="plays the audio currently loaded in the player"
			/>
			<PreviewDataCode
				code={`episode_audio.pause(action: "toggle" | "set" = "set")`}
				description="pauses the audio currently loaded in the player"
			/>
			<PreviewDataCode
				code={`episode_audio.mute(action: "toggle" | "set" = "set")`}
				description="mutes the audio player"
			/>
			<PreviewDataCode
				code={`episode_audio.unmute(action: "toggle" | "set" = "set")`}
				description="unmutes the audio player"
			/>
		</PreviewData>
		<PreviewData name="episode_progress" data={episode_progress}>
			<PreviewDataCode
				code={`episode_progress.subscribe()`}
				description="subscribes to the episode_progress data"
			/>
		</PreviewData>
		<PreviewData name="user_preferences" data={user_preferences}>
			<PreviewDataCode
				code={`user_preferences.subscribe()`}
				description="subscribes to the user_preferences data"
			/>
			<PreviewDataCode
				code={`user_preferences.clear()`}
				description="clears all user preferences and resets them to default values"
			/>
			<PreviewDataCode
				code={`user_preferences.set_playback_rate(value: number)`}
				description="sets the users prefered playback_rate (speed)"
			/>
			<PreviewDataCode
				code={`user_preferences.set_volume(value: number)`}
				description="sets the users prefered volume"
			/>
		</PreviewData>
		<PreviewData name="user_progress" data={user_progress}>
			<PreviewDataCode
				code={`user_progress.subscribe()`}
				description="subscribes to the user_progress data"
			/>
			<button type="button" on:click={user_progress.clear}
				>user_progress.clear()</button
			>
			<PreviewDataCode
				code={`user_progress.clear()`}
				description="clears all user progress for all episodes"
			/>
			<button type="button" on:click={user_progress.clear}
				>user_progress.clear()</button
			>
			<PreviewDataCode
				code={`user_progress.get(src:string)`}
				description="gets the users progress (seconds) for a specific episode"
			/>
			<button type="button" on:click={user_progress.save}
				>user_progress.save()</button
			>
			<PreviewDataCode
				code={`user_progress.save()`}
				description="saves all user progress for all episodes they have interacted with in the current session"
			/>
		</PreviewData>
	</div>
</Section>

<h1>Demo</h1>
<button type="button" on:click={user_preferences.clear}
	>Clear all preferences</button
>

<hr />

<h5>Load Audio</h5>
<button
	type="button"
	on:click={() =>
		episode_audio.load(episodes['syntax'].src, episodes['syntax'])}
>
	Syntax
</button>
<button
	type="button"
	on:click={() =>
		episode_audio.load(episodes['knomii'].src, episodes['knomii'])}
	>Knomii</button
>
<button type="button" on:click={() => episode_audio.unload()}>None</button>

<hr />

<h5>Custom audio controls</h5>

<h6>Play / Pause Actions</h6>

<button type="button" on:click={() => episode_audio.play()}>Play</button>
<button type="button" on:click={() => episode_audio.pause()}>Pause</button>
<button type="button" on:click={() => episode_audio.pause('toggle')}
	>Toggle</button
>

<hr />

<h6>Audio Actions</h6>

<button type="button" on:click={() => episode_audio.mute()}>Mute</button>
<button type="button" on:click={() => episode_audio.unmute()}>Unmute</button>
<button type="button" on:click={() => episode_audio.mute('toggle')}
	>Toggle</button
>

<hr />

<h6>Seeking</h6>

<button type="button" on:click={() => episode_audio.seek(30)}
	>Go to 30s from start
</button>
<button type="button" on:click={() => episode_audio.seek(30, 'from-end')}
	>Go to 30s from end</button
>
<button type="button" on:click={() => episode_audio.skip(10, 'forward')}
	>Skip 10s</button
>
<button type="button" on:click={() => episode_audio.skip(10, 'backward')}
	>Rewind 10s</button
>

<hr />

<h6>Playback Rate</h6>

{#each [0.5, 1, 2, 3] as rate}
	<button
		type="button"
		on:click={() => user_preferences.set_playback_rate(rate)}
	>
		{rate}x
	</button>
{/each}

<!-- <PodcastPlayer
	artwork={$episode_audio?.details?.artwork}
	title={$episode_audio?.details?.title || 'Podcast Name'}
/> -->
