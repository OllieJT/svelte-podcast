<script lang="ts">
	import Anchor from '../anchor.svelte';

	export let title: string;
	export let subtitle: string | undefined = undefined;
</script>

<h3 class="text-xl font-medium leading-relaxed text-mono-900"><Anchor value={title} /></h3>
{#if subtitle}
	<p class="text-xl font-normal leading-normal text-mono-500">{subtitle}</p>
{/if}
