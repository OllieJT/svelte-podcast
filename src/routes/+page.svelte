<script>
	import { Section } from '$src/content/components';
	import { episodes } from '$src/content/episodes';
	import Metadata from '$src/layout/metadata.svelte';
	import {
		add_audio_loader,
		install,
		load_audio_local,
		load_audio_remote,
	} from '$src/routes/code';

	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import lang_shell from 'svelte-highlight/languages/shell';
	import lang_ts from 'svelte-highlight/languages/typescript';

	/** @type { import('./$types').PageServerData} */
	export let data;

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<!-- TODO: add screenshots under images -->

<Metadata />

<Section labelledby="about">
	<div class="prose prose-lg prose-slate">
		<h2 id="about"><a href="#about">Introduction</a></h2>
		<p>
			Svelte-Podcast streamlines the creation of custom audio players and
			simplifies state management in Svelte apps.
		</p>

		<p>
			<b>Build custom Audio Player UI</b>
			<br />
			Simplify the creation of custom audio players with a set of headless components
			that keep out of your way and take care of core functionality.
		</p>

		<p>
			<b>Easily manage Audio State</b>
			<br />
			Loading, controlling, and keeping track of multiple audio sources is a pain.
			svelte-podcast abstracts this away and provides a simple interface to manage
			audio state.
		</p>

		<p>
			<b>Track user preferences</b>
			<br />
			Users expect a lot from media players. It should remember their preferences
			like playback speed, and it should remember where they were in an episode
			even after reloading the page. svelte-podcast takes care of this for you,
			and provides you with access to extend this with your own database.
		</p>
	</div>
</Section>

<Section labelledby="setup">
	<div class="prose prose-lg prose-slate">
		<h2 id="setup"><a href="#setup">Setup</a></h2>
		<h3 id="installation"><a href="#installation">Installation</a></h3>

		<p>
			Install the latest version of svelte-podcast with your preferred
			package manager.
		</p>

		<div class="not-prose flex flex-col items-stretch gap-2 py-1">
			<Highlight language={lang_shell} code={install} />
		</div>

		<h3 id="add-loader"><a href="#add-loader">Add Loader</a></h3>

		<p class="text-primary-600">
			<b class="font-medium">Important</b>: The AudioLoader component does
			<em>not</em>
			render any UI. However it <em>is required</em> to use svelte-podcast.
		</p>

		<p>
			This component is responsible for loading the audio sources and
			persisting the audio state between page loads. This means that your
			audio will continue playing even if the user refreshes the page, or you
			use different UI for the media player.
		</p>

		<p>
			Add the AudioLoader component to your app. It should be as close to the
			root of your app as possible to ensure the audio state behaves as
			expected in nested routes.
		</p>

		<ul>
			<li>You must have one of these for svelte-podcast to work.</li>
			<li>You should also only load one instance of this at a time</li>
			<li>
				We recommend you loading it at the base of your app in your
				layout.svelte file.
			</li>
		</ul>

		<div class="not-prose flex flex-col items-stretch gap-2 py-1">
			<HighlightSvelte code={add_audio_loader} />
		</div>
	</div>
</Section>

<Section labelledby="api">
	<div class="prose prose-lg prose-slate">
		<h2 id="api"><a href="#api">API</a></h2>

		<section aria-labelledby="load-audio">
			<h3 id="load-audio"><a href="#load-audio">Load audio source</a></h3>

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

			<div class="not-prose flex flex-col items-stretch gap-2 py-1">
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

			<div class="not-prose flex flex-col items-stretch gap-2 py-1">
				<Highlight code={load_audio_local} language={lang_ts} />
			</div>
		</section>

		<!-- episode_audio -->
		<section aria-labelledby="episode-audio">
			<h3 id="episode-audio"><a href="#episode-audio">episode_audio</a></h3>
			<p>TODO</p>
		</section>

		<!-- episode_details -->
		<section aria-labelledby="episode-details">
			<h3 id="episode-details">
				<a href="#episode-details">episode_details</a>
			</h3>
			<p>TODO</p>
		</section>

		<!-- episode_progress -->
		<section aria-labelledby="episode-progress">
			<h3 id="episode-progress">
				<a href="#episode-progress">episode_progress</a>
			</h3>
			<p>TODO</p>
		</section>
	</div>
</Section>

<div class="prose prose-lg prose-slate">{@html data.html}</div>
