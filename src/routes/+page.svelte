<script>
	import Metadata from '$src/components/metadata.svelte';
	import { Section } from '$src/content/components';
	import { episodes } from '$src/content/episodes';

	/** @type { import('./$types').PageServerData} */
	export let data;

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<!-- TODO: add screenshots under images -->

<Metadata />

<Section>
	<div class="prose prose-lg prose-slate">
		{@html data.html}
	</div>
</Section>
