<script>
	import PlayerWidget from '$src/components/example-player/player-widget.svelte';
	import { episodes } from '$src/content/episodes';
	import { DocsPage } from '$src/layout/page';
	import PreviewComponent from '$src/layout/preview-component.svelte';
	import { episode_audio } from 'svelte-podcast';

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

<DocsPage
	title="Examples"
	let:Section
	let:SectionArticle
	let:TableModule
	let:TableSchema
>
	<Section title="PlayerWidget">
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
</DocsPage>
