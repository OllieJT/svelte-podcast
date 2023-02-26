<script lang="ts">
	import { ProgressPlayhead } from '$lib/components/headless/progress';
</script>

<div class="svpod--player-progress">
	<ProgressPlayhead />
</div>

<style>
	.svpod--player-progress {
		--track-bg: var(--svpod--bg-surface);
		--thumb-bg: var(--svpod--fg-accent);
		display: block;
	}

	.svpod--player-progress :global(input) {
		height: 56px;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
		background-color: transparent;
	}
	.svpod--player-progress :global(input:focus) {
		outline: none;
	}
	.svpod--player-progress :global(input::-webkit-slider-runnable-track) {
		width: 100%;
		height: 24px;
		cursor: pointer;
		/* animate: 0.2s; */
		background: var(--track-bg);
		border-radius: 50px;
		border: 2px solid var(--player-bg);
	}
	.svpod--player-progress :global(input::-webkit-slider-thumb) {
		border: 2px solid var(--player-bg);
		height: 36px;
		width: 6px;
		border-radius: 50px;
		background: var(--thumb-bg);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -8px;
	}
	.svpod--player-progress :global(input:focus::-webkit-slider-runnable-track) {
		background: var(--track-bg);
	}
	.svpod--player-progress :global(input::-moz-range-track) {
		width: 100%;
		height: 24px;
		cursor: pointer;
		/* animate: 0.2s; */
		background: var(--track-bg);
		border-radius: 50px;
		border: 2px solid var(--player-bg);
	}
	.svpod--player-progress :global(input::-moz-range-thumb) {
		border: 2px solid var(--player-bg);
		height: 48px;
		width: 8px;
		border-radius: 50px;
		background: var(--thumb-bg);
		cursor: pointer;
	}
	.svpod--player-progress :global(input::-ms-track) {
		width: 100%;
		height: 24px;
		cursor: pointer;
		/* animate: 0.2s; */
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	.svpod--player-progress :global(input::-ms-fill-lower) {
		background: var(--track-bg);
		border: 2px solid var(--player-bg);
		border-radius: 100px;
	}
	.svpod--player-progress :global(input::-ms-fill-upper) {
		background: var(--track-bg);
		border: 2px solid var(--player-bg);
		border-radius: 100px;
	}
	.svpod--player-progress :global(input::-ms-thumb) {
		margin-top: 1px;
		border: 2px solid var(--player-bg);
		height: 48px;
		width: 8px;
		border-radius: 50px;
		background: var(--thumb-bg);
		cursor: pointer;
	}
	.svpod--player-progress :global(input:focus::-ms-fill-lower) {
		background: var(--track-bg);
	}
	.svpod--player-progress :global(input:focus::-ms-fill-upper) {
		background: var(--track-bg);
	}
</style>
