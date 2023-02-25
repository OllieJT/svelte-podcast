<script lang="ts">
	import { episode_audio } from '$lib/audio';
</script>

<button on:click={() => episode_audio.play('toggle')}>
	{#if $episode_audio?.is_paused}
		Play
	{:else}
		Pause
	{/if}
</button>
