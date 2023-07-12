<script>
	import { DocsPage } from '$src/layout/page';
	import { add_audio_loader, install } from './code';

	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import lang_shell from 'svelte-highlight/languages/shell';
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
	<Section title="Add Loader">
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

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<HighlightSvelte code={add_audio_loader} />
		</div>
	</Section>
</DocsPage>