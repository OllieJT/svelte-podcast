<script>
	import { DocsPage } from '$src/layout/page';
	import { Highlight } from 'svelte-highlight';
	import lang_ts from 'svelte-highlight/languages/typescript';
	import {
		load_audio_local,
		load_audio_remote,
		override_episode_state,
		seconds_to_timestamp,
	} from './code';
</script>

<DocsPage
	title="API"
	let:Section
	let:SectionArticle
	let:TableModule
	let:TableSchema
>
	<Section title="episode_audio">
		<!-- methods -->
		<h3>Methods</h3>

		<TableModule
			rows={[
				{
					method: '.subscribe()',
					description: 'You can subscribe to changes in the audio state.',
				},
				{
					method: '.load(\n  src:string, \n  details:EpisodeDetails\n)',
					description:
						'Load a new audio source. This will stop the current audio source and replace it with the new one.',
				},
				{
					method: '.unload()',
					description:
						'Unload the current audio source. This will stop the current audio source and remove it from the audio state.',
				},
				{
					method: '.play(\n  action: "set" | "toggle" = "set"\n)',
					description: 'Set or toggle the play state',
				},
				{
					method: '.pause(\n  action: "set" | "toggle" = "set"\n)',
					description: 'Set or toggle the pause state',
				},
				{
					method: '.mute(\n  action: "set" | "toggle" = "set"\n)',
					description: 'Set or toggle the mute state',
				},
				{
					method: '.unmute(\n  action: "set" | "toggle" = "set"\n)',
					description: 'Set or toggle the unmute state',
				},
				{
					method:
						'.seek(\n  seconds: number, \n  from: "from-start" | "from-end" = "from-start"\n)',
					description:
						'Seek to a specific time in the audio. The `from` parameter determines whether the time is relative to the start or end of the audio.',
				},
				{
					method:
						'.skip(\n  seconds: number, \n  type: "forward" | "backward" = "forward"\n)',
					description:
						'Skip forward or backward in the audio by a specific number of seconds.',
				},
			]}
		/>

		<!-- data -->
		<h3>EpisodeState</h3>

		<TableSchema
			rows={[
				{
					property: 'will_autoplay',
					type: 'boolean',
					description: 'Whether episodes will autoplay once loaded.',
				},
				{
					property: 'is_paused',
					type: 'boolean',
					description: 'Whether the episode is paused.',
				},
				{
					property: 'duration',
					type: 'number',
					description: 'The duration of the episode in seconds.',
				},
				{
					property: 'src',
					type: 'string',
					description: 'The source of the episode.',
				},
				{
					property: 'start_at',
					type: 'number',
					description: 'The starting point of the episode in seconds.',
				},
				{
					property: 'details',
					type: 'EpisodeDetails | null',
					description:
						'The details of the episode or null if there are none.',
				},
			]}
		/>

		<SectionArticle title="Load audio source">
			<p>
				All you need to load an episode is a URL to an audio file.
				svelte-podcast uses a html audio element under the hood, so any
				audio file compatible with the autio element is also compatible with
				this package.
			</p>

			<h4>Using a remote file (URL)</h4>

			<p>
				An <em>audio url</em> could be a URL to an MP3 file from an RSS
				feed, like this:
				<code>https://media.transistor.fm/27a058c9/27b595e2.mp3</code>. It
				could also be a path to a static file on your server.
			</p>

			<div
				class="codeblock not-prose flex flex-col items-stretch gap-2 py-1"
			>
				<Highlight code={load_audio_remote} language={lang_ts} />
			</div>

			<h4>Using a local file (relative path)</h4>

			<p>
				If you're using SvelteKit, you can store <em>static files</em> in
				the /static directory. When your site is built, everything in the
				static directory will be at the root of your site. If you have a
				file in <code>/static/episides/episode-01.mp3</code> you could load
				it as <code>/episides/episode-01.mp3</code>
			</p>

			<div
				class="codeblock not-prose flex flex-col items-stretch gap-2 py-1"
			>
				<Highlight code={load_audio_local} language={lang_ts} />
			</div>
		</SectionArticle>
	</Section>

	<Section title="episode_details">
		<h3>Methods</h3>

		<TableModule
			rows={[
				{
					method: '.subscribe() | $episode_details',
					description: 'You can subscribe to changes in the audio state.',
				},
				{
					method: '.set(\n  data:EpisodeDetails\n)',
					description: 'You can set the audio state.',
				},
				{
					method: '.update((\n  data:EpisodeDetails) => EpisodeDetails\n)',
					description:
						'You can update the audio state. This is useful if you want to update the state based on the previous state.',
				},
			]}
		/>

		<!-- data -->
		<h3>EpisodeState</h3>
		<div class="not-prose codeblock">
			<Highlight code={`Record<string, unknown>`} language={lang_ts} />
		</div>
		<p>
			Episode state holds the metadata for the current episode. You derermine
			the shape of the this data.
		</p>

		<p>
			For complete type safety, we recommend defining this type yourself in a
			.d.ts file. In SvelteKit, you should do this in <code>
				/src/app.d.ts
			</code>.
		</p>

		<h4>Override EpisodeState</h4>
		<div class="not-prose codeblock">
			<Highlight code={override_episode_state} language={lang_ts} />
		</div>
	</Section>

	<!-- episode_progress -->
	<Section title="episode_progress">
		<!-- methods -->
		<h3>Methods</h3>
		<TableModule
			rows={[
				{
					method: '.subscribe() | $episode_progress',
					description: 'You can subscribe to changes in the audio state.',
				},
				{
					method: '.set(\n  data:EpisodeProgress\n)',
					description: 'You can set the audio state.',
				},
				{
					method:
						'.update(\n  (data:EpisodeProgress) => EpisodeProgress\n)',
					description:
						'You can update the audio state. This is useful if you want to update the state based on the previous state.',
				},
			]}
		/>

		<!-- data -->
		<h3>EpisodeProgress</h3>
		<TableSchema
			rows={[
				{
					property: 'current_time',
					type: 'number',
					description: 'The current time of the episode in seconds.',
				},
				{
					property: 'timestamp',
					type: 'string',
					description:
						"The current time of the episode in the format 'mm:ss'.",
				},
				{
					property: 'has_ended',
					type: 'boolean',
					description: 'Whether the episode has ended or not.',
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

	<!-- user_preferences -->
	<Section title="user_preferences">
		<!-- methods -->
		<h3>Methods</h3>
		<TableModule
			rows={[
				{
					method: '.subscribe() | $episode_audio',
					description:
						'You can subscribe to changes in the users preferences.',
				},
				{
					method: '.set_playback_rate(\n  value:number\n)',
					description: 'You can set the users playback rate.',
				},
				{
					method: '.set_volume(\n  value:number\n)',
					description: 'You can set the users volume.',
				},
				{
					method: '.clear()',
					description: 'You can clear the users preferences.',
				},
			]}
		/>

		<!-- data -->
		<h3>UserPreferences</h3>
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
	</Section>

	<!-- user_progress -->
	<Section title="user_progress">
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

		<!-- data -->
		<h3>UserProgress</h3>
		<p>
			User progress is a record where the keys are audio sources, and the
			values are timestamps in seconds. Progress is retrieved by matching the
			source, and returning the timestamp.
		</p>

		<div class="not-prose codeblock">
			<Highlight code={`Record<string, number>`} language={lang_ts} />
		</div>
	</Section>
</DocsPage>
