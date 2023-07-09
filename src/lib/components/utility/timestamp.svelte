<script lang="ts">
	import { secondsToTimestamp } from '../../utility';

	export let value: number;
	export let force_hours = false;

	$: timestamp = secondsToTimestamp(value, force_hours);
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
