<script lang="ts">
	import { CurrentTimestamp, DurationTimestamp } from '$lib/components/headless';
</script>

<span class={$$props.class}>
	<CurrentTimestamp />
	<DurationTimestamp />
</span>

<style>
	span {
		letter-spacing: 1px;
	}

	span :global([data-content='duration']) {
		opacity: 0.75;
	}
</style>
