<script>
	/** @type {'header'|'section'|'div'}*/
	export let as = 'div';
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class="relative mx-auto w-full max-w-6xl p-4 md:p-6"
>
	<slot />
</svelte:element>
