<script>
	import Container from '$src/layout/page/container.svelte';

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let anchor = title.replaceAll(' ', '-').trim();

	/** @type {'h2'|'h3'|'h4'|'h5'} */
	export let level = 'h2';
</script>

<Container as="section" aria-labelledby={anchor}>
	<div class="richtext">
		<svelte:element this={level} id={anchor}>
			<a href="#{anchor}">{title}</a>
		</svelte:element>

		<slot />
	</div>
</Container>
