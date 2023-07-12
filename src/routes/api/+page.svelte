<script>
	import { DocsPage } from '$src/layout/page';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import lang_ts from 'svelte-highlight/languages/typescript';
	import {
		audio_load,
		audio_mute,
		audio_pause,
		audio_play,
		audio_seek,
		audio_skip,
		audio_subscribe,
		audio_unload,
		audio_unmute,
		seconds_to_timestamp,
		user_preferences_clear,
		user_preferences_set_playback_rate,
		user_preferences_set_volume,
		user_preferences_subscribe,
		user_progress_clear,
		user_progress_get,
		user_progress_save,
		user_progress_subscribe,
	} from './code';
</script>

<DocsPage
	title="API"
	let:Section
	let:SectionArticle
	let:TableModule
	let:TableSchema
>
	<Section title="audio">
		<SectionArticle title="audio data">
			<TableSchema
				rows={[
					{
						property: 'is_loaded',
						type: 'boolean',
						description: 'Whether the audio element is loaded or not',
					},
					{
						property: 'is_paused',
						type: 'boolean',
						description: 'Whether the audio element is paused or not',
					},
					{
						property: 'current_time',
						type: 'number',
						description:
							'The current time of the audio element in seconds',
					},
					{
						property: 'duration',
						type: 'number',
						description: 'The duration of the audio element in seconds',
					},
					{
						property: 'timestamp_current',
						type: 'string',
						description:
							'The current time of the audio element in timestamp format (hh:mm:ss)',
					},
					{
						property: 'timestamp_end',
						type: 'string',
						description:
							'The end time of the audio element in timestamp format (hh:mm:ss)',
					},
				]}
			/>
		</SectionArticle>

		<!--
			audio.subscribe
			audio.load
			audio.unload
			audio.play
			audio.pause
			audio.mute
			audio.unmute
			audio.seek
			audio.skip
		-->
		<SectionArticle title="audio.subscribe">
			<p>
				Subscribe to specific changes in the audio attributes. This will
				return a readable store that you can use to access the attributes.
			</p>
			<div class="not-prose codeblock">
				<HighlightSvelte code={audio_subscribe} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.load">
			<p>
				Load a new audio source. This will stop the current audio source and
				replace it with the new one.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_load} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.unload">
			<p>
				Unload the current audio source. This will stop the current audio
				source and remove it from the audio state.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_unload} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.play">
			<p>Set or toggle the play state.</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_play} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.pause">
			<p>Set or toggle the pause state.</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_pause} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.mute">
			<p>Set or toggle the mute state.</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_mute} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.unmute">
			<p>Set or toggle the unmute state.</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_unmute} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.seek">
			<p>
				Seek to a specific time in the audio. The `from` parameter
				determines whether the time is relative to the start or end of the
				audio.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_seek} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="audio.skip">
			<p>
				Skip forward or backward in the audio by a specific number of
				seconds.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={audio_skip} language={lang_ts} />
			</div>
		</SectionArticle>
	</Section>

	<Section title="user_preferences">
		<SectionArticle title="user_preferences data">
			<TableSchema
				rows={[
					{
						property: 'playback_rate',
						type: 'number',
						description: 'The audio player playback rate (speed)',
					},
					{
						property: 'volume',
						type: 'number',
						description: 'The audio player volume.',
					},
				]}
			/>
		</SectionArticle>

		<!--
			user_preferences.subscribe
			user_preferences.set_playback_rate
			user_preferences.set_volume
			user_preferences.clear
		 -->
		<SectionArticle title="user_preferences.subscribe">
			<p>
				Subscribe to changes in the user preferences. This will return a
				readable store that you can use to access the user preferences.
			</p>
			<div class="not-prose codeblock">
				<HighlightSvelte code={user_preferences_subscribe} />
			</div>
		</SectionArticle>

		<SectionArticle title="user_preferences.set_playback_rate">
			<p>
				Set the playback rate. This will update the user preferences and
				apply the new playback rate to the audio.
			</p>
			<div class="not-prose codeblock">
				<Highlight
					code={user_preferences_set_playback_rate}
					language={lang_ts}
				/>
			</div>
		</SectionArticle>

		<SectionArticle title="user_preferences.set_volume">
			<p>
				Set the volume. This will update the user preferences and apply the
				new volume to the audio.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={user_preferences_set_volume} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="user_preferences.clear">
			<p>
				Clear the user preferences. This will reset the user preferences to
				the default values.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={user_preferences_clear} language={lang_ts} />
			</div>
		</SectionArticle>
	</Section>

	<!-- user_progress -->
	<Section title="user_progress">
		<SectionArticle title="user_progress data">
			<p>
				User progress is a record where the keys are audio sources, and the
				values are timestamps in seconds. Progress is retrieved by matching
				the source, and returning the timestamp.
			</p>

			<div class="not-prose codeblock">
				<Highlight code={`Record<string, number>`} language={lang_ts} />
			</div>
		</SectionArticle>

		<!--
			* user_progress.subscribe - Subscribes to user progress store
			* user_progress.get - Gets user progress for a given audio source
			* user_progress.clear - Clears user progress store
			* user_progress.save - Saves user progress
		 -->
		<SectionArticle title="user_progress.subscribe">
			<p>
				Subscribe to changes in the user progress. This will return a
				readable store that you can use to access the user progress.
			</p>
			<div class="not-prose codeblock">
				<HighlightSvelte code={user_progress_subscribe} />
			</div>
		</SectionArticle>

		<SectionArticle title="user_progress.get">
			<p>
				Get the user progress for a given audio source. This will return the
				timestamp in seconds.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={user_progress_get} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="user_progress.clear">
			<p>
				Clear the user progress. This will reset the user progress to the
				default values.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={user_progress_clear} language={lang_ts} />
			</div>
		</SectionArticle>

		<SectionArticle title="user_progress.save">
			<p>
				Save the user progress for a given audio source. This will update
				the user progress with the new timestamp.
			</p>
			<div class="not-prose codeblock">
				<Highlight code={user_progress_save} language={lang_ts} />
			</div>
		</SectionArticle>

		<!-- methods -->
		<h3>Methods</h3>
		<TableModule
			rows={[
				{
					method: '.subscribe() | $episode_progress',
					description:
						'You can subscribe to changes in the users progress.',
				},
				{
					method: '.get(\n  src:string\n): number | undefined',
					description:
						'You can get the users progress for a given audio source.',
				},
				{
					method: '.save(\n  src:string, \n  value:number\n)',
					description:
						'You can save the users progress for a given audio source.',
				},
				{
					method: '.clear()',
					description: 'You can clear the users progress.',
				},
			]}
		/>
	</Section>

	<!-- seconds_to_timestamp -->
	<Section title="seconds_to_timestamp">
		<TableSchema
			rows={[
				{
					property: 'seconds',
					type: 'number',
					description: 'The number of seconds to convert.',
				},
				{
					property: 'force_hours',
					type: 'boolean',
					description:
						"Whether to include hours in the timestamp, even if it's 0.",
				},
			]}
		/>

		<div class="not-prose codeblock">
			<Highlight code={seconds_to_timestamp} language={lang_ts} />
		</div>
	</Section>
</DocsPage>
