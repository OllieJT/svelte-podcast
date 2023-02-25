<script lang="ts">
	import { episode_progress } from '$lib/audio';
	import { secondsToTimestamp } from '$lib/utility';

	$: current_time = secondsToTimestamp($episode_progress?.current_time || 0);
</script>

<span class={$$props.class}>{current_time}</span>
