<script lang="ts">
	import { secondsToTimestamp } from '$lib/utility';

	export let value: number;

	$: timestamp = secondsToTimestamp(value);
</script>

<div class={$$props.class}>
	<span>{timestamp}</span>
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 4px;
		font-size: 1em;
		line-height: 1em;
		pointer-events: none;
	}
	span {
		letter-spacing: 0.5px;
		font-size: 0.8em;
		display: block;
		width: 8ch;
	}

	span :global([data-content='duration']) {
		opacity: 0.75;
	}
</style>
