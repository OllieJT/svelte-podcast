<script lang="ts">
	import type { SvelteIcon } from '@inqling/svelte-icons';

	type Feature = {
		icon: SvelteIcon;
		title: string;
		description: string;
	};

	export let features: Feature[];
</script>

<dl
	class="mx-auto grid max-w-2xl grid-cols-1 gap-6 py-6 text-base leading-7 text-mono-600 sm:grid-cols-2 sm:gap-y-10 lg:mx-0 lg:max-w-none"
>
	{#each features as feature}
		<div class="relative pl-9">
			<dt class="inline font-semibold text-mono-900">
				<svelte:component
					this={feature.icon}
					class="absolute top-1 left-1 h-5 w-5 text-primary-600"
				/>

				{feature.title}
			</dt>
			<dd class="inline">{feature.description}</dd>
		</div>
	{/each}
</dl>
