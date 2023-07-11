<script>
	/** @type {string} */
	export let title;

	/** @type {string} */
	export let anchor = title.replaceAll(' ', '-').trim();

	/** @type {'h3'|'h4'|'h5'} */
	export let level = 'h3';
</script>

<article aria-labelledby={anchor}>
	<svelte:element this={level} id={anchor}>
		<a href="#{anchor}">{title}</a>
	</svelte:element>

	<slot />
</article>
