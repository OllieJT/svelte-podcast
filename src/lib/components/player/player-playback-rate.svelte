<script lang="ts">
	import { PlaybackRateContainer, PlaybackRateOption } from '$lib/components/headless';
</script>

<div>
	<PlaybackRateContainer let:id let:value>
		<PlaybackRateOption {id} {value} class="svpod--button" />
	</PlaybackRateContainer>
</div>

<style>
	div {
		letter-spacing: 0.5px;
	}

	div :global([data-content='playback_speed']) {
		opacity: 0.75;
	}
</style>
