<script>
	import Anchor from './anchor.svelte';

	/** @type {string} */
	export let title;

	/** @type {string | undefined} */
	export let subtitle = undefined;
</script>

<h3 class="text-xl font-medium leading-relaxed text-mono-900">
	<Anchor value={title} />
</h3>
{#if subtitle}
	<p class="text-xl font-normal leading-normal text-mono-500">{subtitle}</p>
{/if}
