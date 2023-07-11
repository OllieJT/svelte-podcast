<script>
	import Metadata from '$src/layout/metadata.svelte';
	import Container from '$src/layout/page/container.svelte';
	import SectionArticle from '$src/layout/page/section-article.svelte';
	import Section from '$src/layout/page/section.svelte';
	import TableModule from '$src/layout/page/table-module.svelte';
	import TableSchema from '$src/layout/page/table-schema.svelte';

	/** @type {string}*/
	export let title;
</script>

<Metadata {title} />

<Container as="header" aria-labelledby="api">
	<div class="richtext pt-20">
		<h1 id="api">{title}</h1>
	</div>
</Container>

<slot {Section} {SectionArticle} {TableModule} {TableSchema} />
