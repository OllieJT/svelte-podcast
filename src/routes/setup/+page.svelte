<script>
	import { DocsPage } from '$src/layout/page';
	import { Highlight } from 'svelte-highlight';
	import lang_shell from 'svelte-highlight/languages/shell';
	import lang_ts from 'svelte-highlight/languages/typescript';
	import {
		install,
		load_audio_advanced,
		load_audio_local,
		load_audio_remote,
		override_episode_state,
	} from './code';
</script>

<DocsPage title="Setup" let:Section>
	<Section title="Installation">
		<p>
			Install the latest version of svelte-podcast with your preferred
			package manager.
		</p>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<Highlight language={lang_shell} code={install} />
		</div>
	</Section>

	<Section title="Audio Sources">
		<p>
			To get started, you'll need an audio file. velte-podcast uses a html <code
				>{'<audio />'}</code
			> element under the hood, so any file compatible with the audio element
			will work.
		</p>

		<p>
			You can provide your audio files via absolute URL's - hosted online, or
			relative paths - hosted within your project.
		</p>

		<h3>Using a remote file (URL)</h3>

		<p>
			An <em>audio url</em> could be a URL to an MP3 file from an RSS feed,
			like this:
			<code>https://media.transistor.fm/27a058c9/27b595e2.mp3</code>. It
			could also be a path to a static file on your server.
		</p>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<Highlight code={load_audio_remote} language={lang_ts} />
		</div>

		<h3>Using a local file (relative path)</h3>

		<p>
			If you're using SvelteKit, you can store <em>static files</em> in the
			/static directory. When your site is built, everything in the static
			directory will be at the root of your site. If you have a file in
			<code>/static/episides/episode-01.mp3</code>
			you could load it as <code>/episides/episode-01.mp3</code>
		</p>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<Highlight code={load_audio_local} language={lang_ts} />
		</div>

		<h3>Additional options</h3>

		<p>
			Along side your audio source, you can optionally define arbitrary
			metadata for you to use in your player, and determine if the episode
			should autoplay once loaded. Learn more in the <a
				href="/api/#audio.src">api docs</a
			>
		</p>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<Highlight code={load_audio_advanced} language={lang_ts} />
		</div>
	</Section>

	<Section title="Type Safety">
		<p>
			Svelte podast makes it easy for you to associate arbitrary metadata
			with each audio source. We recommend defining the shape of your
			metadata in a <code>.d.ts</code> file.
		</p>

		<p>
			In this example, we'll assume that your metadata consists of an episode
			title, episode artwork, and an optional episode guest name.
		</p>

		<div class="not-prose codeblock">
			<Highlight code={override_episode_state} language={lang_ts} />
		</div>

		<p>
			If you're using SvelteKit, we recommend keeping this in <code
				>src/app.d.ts</code
			>.
		</p>
	</Section>
</DocsPage>
