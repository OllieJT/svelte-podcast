<script lang="ts">
	import { PlaybackRateContainer, PlaybackRateOption } from '$lib/components/headless';
</script>

<PlaybackRateContainer let:id let:value>
	<PlaybackRateOption {id} {value} />
</PlaybackRateContainer>

<style>
</style>
