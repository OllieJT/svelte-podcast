<script lang="ts">
	import { episode_audio } from '$lib/audio';
	import { secondsToTimestamp } from '$lib/utility';

	$: duration = secondsToTimestamp($episode_audio?.duration || 0);
</script>

<span data-content="duration" class={$$props.class}>/{duration}</span>
