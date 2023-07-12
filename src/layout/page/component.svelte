<script>
	import { on_this_page, slugify } from '$src/layout/helper';
	import Metadata from '$src/layout/metadata.svelte';
	import Container from '$src/layout/page/container.svelte';
	import SectionArticle from '$src/layout/page/section-article.svelte';
	import Section from '$src/layout/page/section.svelte';
	import TableSchema from '$src/layout/page/table-schema.svelte';
	import { onMount } from 'svelte';

	/** @type {string}*/
	export let title;

	export let anchor = slugify(title);

	const anchor_links = on_this_page();

	onMount(() => {
		console.log('on_this_page', JSON.stringify(anchor_links, null, 3));
	});
</script>

<Metadata {title} />

<slot name="header" {anchor} {title}>
	<Container as="header" aria-labelledby={anchor}>
		<div class="richtext sm:pt-10 lg:pt-20">
			<h1 id={anchor} class="my-0">{title}</h1>
		</div>
	</Container>
</slot>

<slot {Section} {SectionArticle} {TableSchema} />
