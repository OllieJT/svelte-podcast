<script lang="ts">
	import type { SvelteIcon } from '@inqling/svelte-icons';

	export let icon: SvelteIcon;
	export let label: string;
</script>

<svelte:component this={icon} />
<span class="svpod--a11y-hidden">{label}</span>
