<script lang="ts">
	import { CurrentTimestamp, DurationTimestamp } from '$lib/components/headless';
</script>

<span class={$$props.class}>
	<CurrentTimestamp />
	<DurationTimestamp />
</span>

<style>
	.svpod--audio-progress {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: max-content;
	}
</style>
