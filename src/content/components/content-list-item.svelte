<script>
	import Anchor from './anchor.svelte';

	/** @type {string} */
	export let title;

	/** @type {boolean} */
	export let anchor = false;
</script>

<li class="list-item list-disc text-primary-800">
	<h4 class="text-lg font-medium leading-normal text-primary-600">
		{#if anchor}
			<Anchor value={title} />
		{:else}
			{title}
		{/if}
	</h4>
	<p class="mt-0 text-mono-600">
		<slot />
	</p>
</li>
