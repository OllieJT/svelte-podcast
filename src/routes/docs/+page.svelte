<script>
	import { Section } from '$src/content/components';
	import { episodes } from '$src/content/episodes';
	import Metadata from '$src/layout/metadata.svelte';

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<Metadata title="Docs" />

<Section labelledby="about">
	<div class="richtext">
		<header>
			<h1 id="about"><a href="#about">Introduction</a></h1>
		</header>
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
