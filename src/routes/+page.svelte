<script>
	import { base } from '$app/paths';
	import { PlayerWidget } from '$src/components/example-player';
	import { episodes } from '$src/content/episodes';
	import { DocsPage } from '$src/layout/page';
	import { audio_element } from 'svelte-podcast/audio';

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<DocsPage title="Docs" let:Section>
	<header
		slot="header"
		class="relative isolate bg-white"
		aria-labelledby="hero"
	>
		<svg
			class="absolute inset-0 -z-10 h-full w-full stroke-mono-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
					width="200"
					height="200"
					x="50%"
					y="-1"
					patternUnits="userSpaceOnUse"
				>
					<path d="M.5 200V.5H200" fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				stroke-width="0"
				fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
			/>
		</svg>
		<div>
			<div class="relative py-24">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl text-center">
						<h1 id="hero">
							<span class="block text-xl font-medium text-primary-600">
								svelte-podcast<span class="sr-only">: </span>
							</span>
							<span
								class="text-4xl font-bold tracking-tight text-mono-900 sm:text-6xl"
							>
								The fastest way to build a podcast site with Svelte.
							</span>
						</h1>
						<p class="mt-6 text-xl leading-8 text-mono-600">
							A suite of tools and components to build your own podcast
							players, and work with RSS podcast data in SvelteKit.
							<span
								class="mt-3 block text-base leading-none text-primary-800"
							>
								<span
									class="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-600"
								>
									Coming Soon<span class="sr-only">:</span>
								</span>
								<span class="tracking-wide"
									>SSR utilities for consuming RSS podcast feeds</span
								>
							</span>
						</p>
						<div class="mt-10 flex items-center justify-center gap-x-3">
							<a
								href="{base}/setup"
								class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								Get started
							</a>
							<a
								href="{base}/api"
								class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-mono-600 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
							>
								Examples <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
					<div class="mt-16 flow-root sm:mt-24">
						<div
							class="-m-2 grid grid-cols-1 grid-rows-1 rounded-xl border border-mono-100 bg-white p-1 shadow-2xl shadow-mono-200 sm:p-2 lg:-m-4 lg:rounded-2xl lg:p-4"
						>
							<PlayerWidget
								src={audio_src}
								class="w-full border border-mono-100"
								options={{
									duration: true,
									current_time: true,
									playback_rate: true,
									skip_back: 10,
									skip_forward: 30,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<Section title="Introduction">
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
	</Section>
</DocsPage>
<button
	on:click={() => {
		if (!$audio_element) return console.log('no element');
		const player = $audio_element;
		player.controls = true;
		player.src = episodes.syntax.src;
	}}
>
	Show Audio Element
</button>

<style>
	:global(#svpod--generated-audio-element) {
		margin: auto;
		width: 50vw;
		display: block;
	}
</style>
