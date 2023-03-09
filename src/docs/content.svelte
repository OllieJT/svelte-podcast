<script lang="ts">
	import {
		Content,
		ContentListItem,
		ContentTitle,
		Features,
		Section,
		SectionTitle,
	} from '$docs/components';
	import {
		AdjustmentsHorizontal,
		BookmarkSquare,
		CommandLine,
		PuzzlePiece,
		Sparkles,
	} from '@inqling/svelte-icons/heroicon-24-outline';
	import { CodeBlock } from 'svhighlight';
	import example_add_loader from './example/add-loader.svelte?raw';
	import example_load_audio_click from './example/load-audio-click.svelte?raw';
	import example_load_audio_mount from './example/load-audio-mount.svelte?raw';
	import { code_opts } from './utility/code-opts';
</script>

<Section>
	<SectionTitle title="What is svelte-podcast?" />

	<Content>
		<ContentTitle title="Motivation" />
		<p>Coming soon...</p>
		<p>At it's core svelte-podcast provides tooling to make the following tasks easier:</p>
		<ul class="space-y-6">
			<ContentListItem title="How can I build a custom audio player?">
				The default audio element is quite nice, but there are 2 main reasons why people want to
				build their own; 1 - to customize the look and feel, and 2 - to add custom functionality.
				svelte-podcast provides a simple API enabling you to resolve both of these desires.
			</ContentListItem>
			<ContentListItem title="How do I manage the state of audio throughout my site?">
				It's one thing to load, play, and pause audio on a single page, but what if you want to
				build more custom or advanced behaviours like "how can the audio continue playing when the
				user navigates to a new page". svelte-podcast simplifies this proccess by simplifying your
				interactions with the audio element.
			</ContentListItem>
			<ContentListItem title="How can I consume a podcasts RSS feed?">
				Coming soon...
			</ContentListItem>
		</ul>
	</Content>

	<Content>
		<ContentTitle title="Features" />
		<Features
			features={[
				{
					title: 'Simple API',
					description:
						'Get essential audio data like the current timestamp, duration, play state and more...',
					icon: CommandLine,
				},
				{
					title: 'Simple Controls',
					description:
						'Control your active audio source with play, pause, seek, and more methods...',
					icon: AdjustmentsHorizontal,
				},
				{
					title: 'Extensible',
					description:
						'Define your own metadata for each episode to easily association content with the current audio',
					icon: PuzzlePiece,
				},
				{
					title: 'Save Progress',
					description:
						'Save and load a users progress and preferences to localStorage, or your own database',
					icon: BookmarkSquare,
				},
				{
					title: 'Persistence',
					description:
						'If your site makes use of client side routing, audio will continue playing when users navigate',
					icon: Sparkles,
				},
				{
					title: 'Typescript',
					description:
						'1st class types, with type overrides for defining your own metadata requirements',
					icon: BookmarkSquare,
				},
			]}
		/>
	</Content>
</Section>

<Section>
	<SectionTitle title="Get Started" />

	<Content>
		<ContentTitle title="Install" />
		<p>
			Install the latest version of <em>svelte-podcast</em> with your preferred package manager.
		</p>
		<CodeBlock
			{...code_opts}
			headerText="with npm"
			language="sh"
			code="npm install svelte-podcast@latest"
			showLineNumbers={false}
		/>
		<CodeBlock
			{...code_opts}
			headerText="with yarn"
			language="sh"
			code="yarn add svelte-podcast@latest"
			showLineNumbers={false}
		/>
		<CodeBlock
			{...code_opts}
			headerText="with pnpm"
			language="sh"
			code="pnpm add svelte-podcast@latest"
			showLineNumbers={false}
		/>
	</Content>

	<Content>
		<ContentTitle title="Setup" />
		<p>
			Add the AudioLoader component to your root layout. You must have one of these for
			svelte-podcast to work. You should also only load one instance of this at a time, and so we
			recommend you loading it at the base of your app.
		</p>

		<CodeBlock
			{...code_opts}
			headerText="/routes/+layout.svelte"
			language="svelte"
			code={example_add_loader}
		/>
	</Content>

	<Content>
		<ContentTitle title="Load an episode" />
		<p>
			All you need to load an episode is a URL to an audio file. svelte-podcast uses a html audio
			element under the hood, so any audio file compatible with the autio element is also compatible
			with this package.
		</p>

		<p>
			An audio url could be a URL to an MP3 file from an RSS feed, like this:
			<mark>"https://media.transistor.fm/27a058c9/27b595e2.mp3"</mark>. It could also be a path to a
			static file on your server.
		</p>

		<p>
			If you're using SvelteKit, you can store static files in the /static directory. When your site
			is built, everything in the static directory will be at the root of your site. If you have a
			file in /static/episides/episode-01.mp3 you could load it as <mark
				>"/episides/episode-01.mp3"</mark
			>
		</p>

		<p>
			Only one piece of audio can be loaded at a time, however a users progress for each audio is
			saved in localStorage when they play, pause, or skip. You can load audio via the episode_audio
			store from anywhere in your project.
		</p>

		<CodeBlock
			{...code_opts}
			headerText="example: load on click"
			language="svelte"
			code={example_load_audio_click}
			highlightLines="1,7"
		/>

		<CodeBlock
			{...code_opts}
			headerText="example: load on mount"
			language="svelte"
			code={example_load_audio_mount}
			highlightLines="2,6"
		/>
	</Content>
</Section>

<Section>
	<SectionTitle title="Prebuilt Components" />

	<Content>
		<ContentTitle title="<PlayerWidget/>" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="<PlayerStack/>" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="<HeadlessTimeline/>" />
		<p>Coming soon...</p>
	</Content>
</Section>

<Section>
	<SectionTitle title="Library Exports" />

	<Content>
		<ContentTitle title="Debug Mode" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="audio" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="episode_progress" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="episode_details" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="user_progress & user_preferences" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="save_podcast_state" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="secondsToTimestamp" />
		<p>Coming soon...</p>
	</Content>
</Section>

<Section>
	<SectionTitle title="Typescript" />

	<Content>
		<ContentTitle title="Override types" />
		<p>Coming soon...</p>
	</Content>

	<Content>
		<ContentTitle title="Exported types" />
		<p>Coming soon...</p>
	</Content>
</Section>

<Section>
	<SectionTitle title="Guides" />

	<Content>
		<ContentTitle title="How to make your own player component?" />
		<p>Coming soon...</p>
	</Content>
</Section>
