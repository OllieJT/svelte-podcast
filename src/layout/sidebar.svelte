<script>
	import { assets } from '$app/paths';
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	/**
	 * Audio context module.
	 * @module sidebar
	 */

	/**
	 * @typedef {Object} SectionLink
	 * @property {string} label - The label of the page link.
	 * @property {string} anchor - The URL of the page link.
	 */

	/**
	 * @typedef {Object} PageLink
	 * @property {string} label - The label of the page link.
	 * @property {string} href - The URL of the page link.
	 * @property {SectionLink[]} sections - The sections of the page link.
	 */

	/** @type {Readonly<PageLink[]>}  */
	export let pages;

	/**
	 * @typedef {Object} ResourceLink
	 * @property {string} label - The label of the page link.
	 * @property {string} href - The URL of the page link.
	 * @property {import('@inqling/svelte-icons').SvelteIcon} icon - The URL of the page link.
	 */

	/** @type {Readonly<ResourceLink[]>}  */
	export let resources;

	/**
	 * @typedef {Object} PodcastLink
	 * @property {string} label - The label of the page link.
	 * @property {string} href - The URL of the page link.
	 * @property {string} src - The URL of the page link.
	 */

	/** @type {Readonly<PodcastLink[]>}  */
	export let podcasts;

	$: use_is_current = (/** @type {string } */ href) => {
		let href_pathname = href;

		if (href.startsWith('http')) {
			href_pathname = new URL(href).pathname;
		}

		// remove leading and training slashes
		href_pathname = href_pathname.replace(/^\/|\/$/g, '');

		const page_pathname = $page.url.pathname.replace(/^\/|\/$/g, '');

		return page_pathname === href_pathname;
	};

	const use_is_current_section = (
		/** @type {boolean} */ is_current_page,
		/** @type {string} */ anchor,
	) => {
		if (!is_current_page) return false;

		return $page.url.hash.includes(anchor);
	};
</script>

<!-- Sidebar component, swap this element with another sidebar if you like -->
<div
	in:fly={{
		x: -320,
		duration: 300,
		easing: circOut,
		opacity: 1,
	}}
	out:fly={{
		x: -320,
		duration: 300,
		easing: circOut,
		opacity: 1,
	}}
	class={clsx(
		'pointer-events-auto flex grow origin-left flex-col gap-y-5 overflow-y-auto bg-white px-6',
		$$restProps.class,
	)}
>
	<a href="/" class="flex h-16 shrink-0 items-center">
		<img
			class="h-8 w-auto"
			width={60}
			height={32}
			src="{assets}/logo.png"
			alt="Svelte-Podcast"
		/>
	</a>
	<nav class="flex flex-1 flex-col">
		<ul role="list" class="flex flex-1 flex-col gap-y-7">
			<li>
				<ul role="list" class="-mx-2">
					{#each pages as link}
						{@const is_current = use_is_current(link.href)}
						<li class="py-0.5">
							<a
								class:active={is_current}
								href={link.href}
								class={clsx(
									'group flex gap-x-3 rounded-md px-3 py-1.5 text-sm font-semibold leading-6',
									is_current
										? 'bg-primary-50 text-primary-600'
										: 'text-mono-600 hover:bg-mono-50 hover:text-mono-950',
								)}
							>
								{link.label}
							</a>
							{#if link.sections.length}
								<ul role="list" class="border-l border-mono-200 pl-3">
									{#each link.sections as section}
										{@const is_current_section =
											use_is_current_section(
												is_current,
												section.anchor,
											)}
										{@const section_href = [
											link.href,
											section.anchor,
										].join('#')}
										<li class="py-0.5">
											<a
												class:active={is_current_section}
												href={section_href}
												class={clsx(
													'group flex gap-x-3 rounded-md px-3 py-1.5 text-xs font-medium leading-6',
													is_current_section
														? 'text-primary-600'
														: 'text-mono-500 hover:bg-mono-50 hover:text-mono-950',
												)}
											>
												{section.label}
											</a>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</li>
			<li>
				<div class="text-xs font-semibold leading-6 text-mono-400">
					Resources
				</div>
				<ul role="list" class="-mx-2 mt-2 space-y-1">
					{#each resources as link}
						{@const is_current = use_is_current(link.href)}
						<li>
							<a
								href={link.href}
								target="_blank"
								class={clsx(
									'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
									is_current
										? 'bg-mono-50 text-primary-600'
										: 'text-mono-700 hover:bg-mono-50 hover:text-primary-600',
								)}
							>
								<span
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-mono-200 bg-white text-[0.625rem] font-medium text-mono-400 group-hover:border-primary-600 group-hover:text-primary-600"
								>
									<svelte:component this={link.icon} class="h-4 w-4" />
								</span>
								<span class="truncate">{link.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</li>
			<li>
				<div class="text-xs font-semibold leading-6 text-mono-400">
					Svelte Podcasts
				</div>
				<ul role="list" class="-mx-2 mt-2 space-y-1">
					{#each podcasts as link}
						{@const is_current = use_is_current(link.href)}
						<li>
							<a
								href={link.href}
								target="_blank"
								class={clsx(
									'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
									is_current
										? 'bg-mono-50 text-primary-600'
										: 'text-mono-700 hover:bg-mono-50 hover:text-primary-600',
								)}
							>
								<img
									src={link.src}
									height="56"
									width="56"
									alt=""
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-mono-200 bg-white text-[0.625rem] font-medium text-mono-400 group-hover:border-primary-600 group-hover:text-primary-600"
								/>
								<span class="truncate">{link.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</li>
		</ul>
	</nav>
</div>
