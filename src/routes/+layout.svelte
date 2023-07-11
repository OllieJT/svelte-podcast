<script>
	import { assets, base } from '$app/paths';
	import { page } from '$app/stores';
	import { PlayerWidget } from '$src/components/example-player';
	import { episodes } from '$src/content/episodes';
	import { Github } from '@inqling/svelte-icons/simple-icons';
	import clsx from 'clsx';
	import github from 'svelte-highlight/styles/github';
	import { AudioContext } from 'svelte-podcast';
	import '../app.postcss';

	const page_links = Object.freeze([
		{ label: 'About', href: '/' },
		{ label: 'Setup', href: '/#setup' },
		{ label: 'API', href: '/#api' },
		{ label: 'Examples', href: '/#examples' },
	]);

	/** @type { string | undefined} */
	let audio_src = episodes.knomii.src;
</script>

<svelte:head>
	{@html github}
</svelte:head>

<AudioContext />

<nav
	class="sticky top-0 z-50 border-b border-mono-100 bg-white text-lg leading-none lg:overflow-y-visible"
	id="navigation"
>
	<div class="mx-auto max-w-prose px-4 py-1 sm:px-6 sm:py-2 lg:px-8">
		<div class="relative grid grid-cols-12 gap-1 text-base md:gap-3">
			<div class="col-span-2 flex items-center justify-start leading-none">
				<a href="{base}/#navigation" class="flex-shrink-0 py-1">
					<img
						class="block h-8 w-auto"
						width={60}
						height={32}
						src="{assets}/logo.png"
						alt="Svelte-Podcast"
					/>
				</a>
			</div>
			<div
				class="col-span-8 flex items-center justify-center leading-none sm:gap-1"
			>
				{#each page_links as link}
					{@const is_homepage =
						link.href === '/' && $page.url.pathname === link.href}
					{@const is_match =
						link.href !== '/' && $page.url.pathname.startsWith(link.href)}
					<a
						href={base + link.href}
						class={clsx(
							'flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium leading-none ring-inset focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:ring-offset-2 sm:px-4 sm:text-base',
							is_homepage || is_match
								? 'bg-primary-200 text-primary-900'
								: 'text-mono-500 hover:bg-mono-100 hover:text-mono-900',
						)}
					>
						{link.label}
					</a>
				{/each}
			</div>
			<div class="col-span-2 flex items-center justify-end leading-none">
				<a
					href="https://github.com/OllieJT/svelte-podcast"
					target="_blank"
					rel="noreferrer"
					class="flex-shrink-0 rounded-full bg-white p-1 text-mono-500 ring-2 ring-transparent transition-all ease-out hover:text-mono-900 hover:ring-mono-200 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					<span class="sr-only">View Repository</span>
					<Github class="h-6 w-6" aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</nav>

<header class="relative isolate bg-white">
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
		<div class="relative py-24 sm:py-32 lg:pb-40">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
					<h1>
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
							href="{base}/#docs"
							class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
						>
							Get started
						</a>
						<a
							href="{base}/#examples"
							class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-mono-600 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
						>
							Examples <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
				<div class="mt-16 flow-root sm:mt-24">
					<div
						class="-m-2 rounded-xl border border-mono-100 bg-white p-1 shadow-2xl shadow-mono-200 sm:p-2 lg:-m-4 lg:rounded-2xl lg:p-4"
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

<main>
	<slot />
</main>

<footer />
