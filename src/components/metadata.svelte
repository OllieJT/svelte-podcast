<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	const site_name = 'Svelte Podcast';
	const title = 'The fastest way to build a podcast site with Svelte.';
	const description =
		'A suite of tools and components to build your own podcast players, and work with RSS podcast data in SvelteKit.';

	//TODO: update canonical link with static link
	const canonical = $page.url.href + base;
</script>

<!-- TODO: add screenshots under images -->

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
		description: description,
		images: [],
	}}
/>
