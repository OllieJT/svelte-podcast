<script>
	import PlayerWidget from '$src/components/player/player-widget.svelte';
	import { episodes } from '$src/content/episodes';
	import { DocsPage } from '$src/layout/page';
	import { HighlightSvelte } from 'svelte-highlight';
	import { player_css } from './code';

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<DocsPage title="Examples" let:Section>
	<Section title="Coming Soon...">
		<p class="text-xl font-semibold text-red-500">
			This page is a work in progress.
		</p>
	</Section>
	<Section title="PlayerWidget">
		<div class="not-prose py-4">
			<PlayerWidget
				src={audio_src}
				skip_back={30}
				skip_forward={10}
				metadata={{}}
				playback_rate_values={[1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4]}
			/>
		</div>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<HighlightSvelte code={player_css} />
		</div>
	</Section>
</DocsPage>
