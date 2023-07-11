<script>
	import Sidebar from '$src/layout/sidebar.svelte';
	import GitHubIcon from '@inqling/svelte-icons/simple-icons/github.svelte';
	import NPMIcon from '@inqling/svelte-icons/simple-icons/npm.svelte';
	import github from 'svelte-highlight/styles/github';
	import { AudioContext } from 'svelte-podcast';
	import { circIn, circOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import '../app.postcss';

	const page_links = Object.freeze([
		{
			label: 'About',
			href: '/',
			sections: [],
		},
		{
			label: 'Setup',
			href: '/setup',
			sections: [
				{ label: 'installation', anchor: 'installation' },
				{ label: 'Loader', anchor: 'add_loader' },
			],
		},
		{
			label: 'API',
			href: '/api',
			sections: [
				{ label: 'Episode Audio', anchor: 'episode_audio' },
				{ label: 'Load Audio Source', anchor: 'load_audio_source' },
				{ label: 'Episode Details', anchor: 'episode_details' },
				{ label: 'Episode Progress', anchor: 'episode_progress' },
				{ label: 'Seconds To Timestamp', anchor: 'seconds_to_timestamp' },
				{ label: 'User Preferences', anchor: 'user_preferences' },
				{ label: 'User Progress', anchor: 'user_progress' },
			],
		},
		{
			label: 'Examples',
			href: '/examples',
			sections: [],
		},
	]);

	const resource_links = Object.freeze([
		{
			label: 'GitHub',
			icon: GitHubIcon,
			href: 'https://github.com/OllieJT/svelte-podcast',
		},
		{
			label: 'NPM',
			icon: NPMIcon,
			href: 'https://www.npmjs.com/package/svelte-podcast',
		},
	]);

	let is_menu_open = false;

	const open_menu = () => (is_menu_open = true);
	const close_menu = () => (is_menu_open = false);
</script>

<svelte:head>
	{@html github}
</svelte:head>

<AudioContext />

<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
<div
	class="pointer-events-none relative z-50 lg:hidden"
	role="dialog"
	aria-modal="true"
>
	{#if is_menu_open}
		<div
			in:fade={{
				duration: 300,
				easing: circOut,
			}}
			out:fade={{
				duration: 300,
				easing: circIn,
			}}
			class="fixed inset-0 bg-mono-900/80"
		/>
	{/if}

	<div class="fixed inset-0 flex">
		{#if is_menu_open}
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<div
					in:fade
					out:fade
					class="absolute left-full top-0 flex w-16 justify-center pt-5"
				>
					<button
						on:click={close_menu}
						type="button"
						class="pointer-events-auto -m-2.5 p-2.5"
					>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<Sidebar
					class="pb-2"
					pages={page_links}
					resources={resource_links}
				/>
			</div>
		{/if}
	</div>
</div>

<!-- Static sidebar for desktop -->
<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
	<Sidebar
		class="border-r border-mono-200"
		pages={page_links}
		resources={resource_links}
	/>
</div>

<div
	class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
>
	<button
		on:click={open_menu}
		type="button"
		class="-m-2.5 p-2.5 text-mono-700 lg:hidden"
	>
		<span class="sr-only">Open sidebar</span>
		<svg
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	</button>
	<div class="flex-1 text-sm font-semibold leading-6 text-mono-900">Menu</div>

	<div class="flex items-center gap-4">
		{#each resource_links as link}
			<a
				href={link.href}
				target="_blank"
				class="flex h-8 w-8 items-center justify-center rounded-full bg-mono-100 text-mono-600 hover:bg-mono-800 hover:text-white"
			>
				<span class="sr-only">{link.label}</span>

				<svelte:component this={link.icon} class="h-6 w-6" />
			</a>
		{/each}
	</div>
</div>

<main class="py-10 lg:pl-72">
	<div class="px-4 sm:px-6 lg:px-8">
		<slot />
	</div>
</main>

<footer />
