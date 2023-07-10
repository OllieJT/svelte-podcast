<script>
	/** @type {import('@inqling/svelte-icons').SvelteIcon} */
	export let icon;

	/** @type {string} */
	export let label;
</script>

<svelte:component this={icon} />
<span class="svpod--a11y-hidden">{label}</span>
