<script>
	/** @type {'header'|'section'|'div'}*/
	export let as = 'div';
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class="relative mx-auto w-full max-w-6xl px-2 py-4 md:px-6 md:py-6"
>
	<slot />
</svelte:element>
