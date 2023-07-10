<script lang="ts">
	import { seconds_to_timestamp } from 'svelte-podcast';

	export let value: number;
	export let force_hours = false;

	$: timestamp = seconds_to_timestamp(value, force_hours);
</script>

<span style="width:{timestamp.length}ch">{timestamp}</span>

<style>
	span {
		letter-spacing: 0.5px;
		font-size: 0.8em;
		display: block;
		width: 8ch;
	}
</style>
