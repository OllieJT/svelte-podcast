<script lang="ts">
	import { episode_audio } from '$lib/audio';

	export let type: 'forward' | 'backward';
	export let seconds: number;
</script>

<button
	on:click={() => episode_audio.skip(seconds, type)}
	class="svpod--rounded svpod--icon-button"
	class:forward={type === 'forward'}
	class:backward={type === 'backward'}
>
	{#if type === 'backward'}
		<span class="svpod--control-label">
			<span class="svpod--a11y-hidden">Rewind</span>
			{seconds}
			<span class="svpod--a11y-hidden">seconds</span>
		</span>
	{:else}
		<span class="svpod--control-label">
			<span class="svpod--a11y-hidden">Skip</span>
			{seconds}
			<span class="svpod--a11y-hidden">seconds</span>
		</span>
	{/if}
</button>

<style>
	button {
		padding: 2px;
	}

	button::after,
	button::before {
		content: '';
		position: absolute;
		border-radius: 9999px;
	}

	button::before {
		inset: 2px;
		transition: transform 0.2s ease-out;
	}

	button::after {
		inset: 6px;
		background: var(--bg);
	}

	button.forward::before {
		background: conic-gradient(var(--fg), transparent);
	}

	button.forward:hover::before {
		transform: rotateZ(180deg);
	}

	button.backward::before {
		background: conic-gradient(transparent, var(--fg));
	}

	button.backward:hover::before {
		transform: rotateZ(-180deg);
	}

	.svpod--control-label {
		position: relative;
		z-index: 1;
	}
</style>
