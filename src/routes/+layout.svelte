<script lang="ts">
	import { page } from '$app/stores';
	import { Github } from '@inqling/svelte-icons/simple-icons';
	import clsx from 'clsx';
	import { AudioLoader } from 'svelte-podcast';
	import '../app.postcss';

	const page_links = [
		{ label: 'Docs', href: '/' },
		{ label: 'Demo', href: '/demo' },
	] as const;
</script>

<header
	class="sticky top-0 z-50 border-b border-mono-100 bg-white text-lg leading-none lg:overflow-y-visible"
	id="navigation"
>
	<div class="mx-auto max-w-prose px-4 py-1 sm:py-2 sm:px-6 lg:px-8">
		<div class="relative grid grid-cols-12 gap-1 text-base md:gap-3">
			<div class="col-span-2 flex items-center justify-start leading-none">
				<a href="/#navigation" class="flex-shrink-0 py-1">
					<img class="block h-8 w-auto" width={60} height={32} src="/logo.png" alt="Your Company" />
				</a>
			</div>
			<div class="col-span-8 flex items-center justify-center leading-none sm:gap-1">
				{#each page_links as link}
					{@const is_homepage = link.href === '/' && $page.url.pathname === link.href}
					{@const is_match = link.href !== '/' && $page.url.pathname.startsWith(link.href)}
					<a
						href={link.href}
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
</header>

<AudioLoader />

<slot />
