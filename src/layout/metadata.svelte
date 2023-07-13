<script>
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	const site_name = 'Svelte Podcast';
	/** @type {string} */
	export let title = 'The fastest way to build a podcast site with Svelte.';
	/** @type {string} */
	export let description =
		'A suite of tools and components to build your own podcast players, and work with RSS podcast data in SvelteKit.';

	/** @type {string} */
	export let canonical = 'https://svelte-podcast.com' + $page.url.pathname;

	// TODO: add screenshots under images
	/** @type {import('svelte-meta-tags').OpenGraph["images"]}*/
	export let images = [
		{
			url: 'https://svelte-podcast.com/thumb-4_3.png',
			width: 800,
			height: 600,
			alt: 'Svelte Podcast Tools',
		},
	];
</script>

<MetaTags
	titleTemplate="%s | {site_name}"
	{title}
	{description}
	{canonical}
	openGraph={{
		locale: 'en_US',
		site_name,
		type: 'website',
		url: canonical,
		title: title,
		description,
		images,
	}}
/>
