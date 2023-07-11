<script>
	import { slugify } from '$src/layout/helper';
	import Metadata from '$src/layout/metadata.svelte';
	import Container from '$src/layout/page/container.svelte';
	import SectionArticle from '$src/layout/page/section-article.svelte';
	import Section from '$src/layout/page/section.svelte';
	import TableModule from '$src/layout/page/table-module.svelte';
	import TableSchema from '$src/layout/page/table-schema.svelte';

	/** @type {string}*/
	export let title;

	export let anchor = slugify(title);
</script>

<Metadata {title} />

<slot name="header" {anchor} {title}>
	<Container as="header" aria-labelledby={anchor}>
		<div class="richtext pt-20">
			<h1 id={anchor} class="my-0">{title}</h1>
		</div>
	</Container>
</slot>

<slot {Section} {SectionArticle} {TableModule} {TableSchema} />
