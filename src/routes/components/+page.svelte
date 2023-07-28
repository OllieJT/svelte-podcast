<script>
	import { episodes } from '$src/content/episodes';
	import { DocsPage } from '$src/layout/page';
	import { HighlightSvelte } from 'svelte-highlight';
	import { PlayerCss, ProgressCss, player_css, progress_css } from './code';

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<DocsPage title="Examples" let:Section>
	<Section title="AudioPlayer">
		<p>
			A component that does not render any UI. Instead, it provides
			convenient functions, values, and headless components via expoded
			values
		</p>

		<p>This component should help</p>
		<div class="not-prose py-4">
			<PlayerCss />
		</div>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<HighlightSvelte code={player_css} />
		</div>
	</Section>
	<Section title="AudioProgress">
		<div class="not-prose py-4">
			<ProgressCss />
		</div>

		<div class="codeblock not-prose flex flex-col items-stretch gap-2 py-1">
			<HighlightSvelte code={progress_css} />
		</div>
	</Section>
</DocsPage>
