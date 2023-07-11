<script>
	import { slugify } from '$src/layout/helper';
	import Container from '$src/layout/page/container.svelte';

	/** @type {string} */
	export let title;

	export let anchor = slugify(title);

	/** @type {'h2'|'h3'|'h4'|'h5'} */
	export let level = 'h2';
</script>

<Container as="section" aria-labelledby={anchor}>
	<div class="richtext">
		<svelte:element this={level} id={anchor} class="mt-0">
			<a href="#{anchor}">{title}</a>
		</svelte:element>

		<slot />
	</div>
</Container>
