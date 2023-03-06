<script lang="ts">
	import { secondsToTimestamp } from '../../utility';

	export let value: number;
	export let force_hours: boolean = false;

	$: timestamp = secondsToTimestamp(value, force_hours);
</script>

<style>
	span {
		letter-spacing: 0.5px;
		font-size: 0.8em;
		display: block;
		width: 8ch;
	}
</style>

<span style="width:{timestamp.length}ch">{timestamp}</span>
