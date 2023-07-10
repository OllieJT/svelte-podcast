<script>
	/**
	 * @typedef {Object} Feature
	 * @property {import('@inqling/svelte-icons').SvelteIcon} icon - The icon component for the feature.
	 * @property {string} title - The title of the feature.
	 * @property {string} description - The description of the feature.
	 */

	/** @type {Feature[]} */
	export let features;
</script>

<dl
	class="mx-auto grid max-w-2xl grid-cols-1 gap-6 py-6 text-base leading-7 text-mono-600 sm:grid-cols-2 sm:gap-y-10 lg:mx-0 lg:max-w-none"
>
	{#each features as feature}
		<div class="relative pl-9">
			<dt class="inline font-semibold text-mono-900">
				<svelte:component
					this={feature.icon}
					class="absolute left-1 top-1 h-5 w-5 text-primary-600"
				/>

				{feature.title}
			</dt>
			<dd class="inline">{feature.description}</dd>
		</div>
	{/each}
</dl>
