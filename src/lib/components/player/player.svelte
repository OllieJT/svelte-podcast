<script lang="ts">
	import PlayerArtwork from '$lib/components/player/player-artwork.svelte';
	import PlayerControlPlay from '$lib/components/player/player-control-play.svelte';
	import PlayerControlSkip from '$lib/components/player/player-control-skip.svelte';
	import PlayerPlaybackRate from '$lib/components/player/player-playback-rate.svelte';
	import PlayerProgress from '$lib/components/player/player-progress.svelte';
	import PlayerTimestamp from '$lib/components/player/player-timestamp.svelte';

	export let artwork: string | undefined = undefined;
	export let title: string | undefined = undefined;
</script>

<article>
	{#if artwork}<PlayerArtwork src={artwork} />{/if}
	<div class="svpod--player-controls">
		<PlayerControlSkip seconds={10} type="backward" />
		<PlayerControlPlay />
		<PlayerControlSkip seconds={10} type="forward" />
	</div>
	<div class="podcast-player-episode-details">
		{#if title}<span> {title} </span>{/if}
		<PlayerProgress />
		<div class="podcast-player-episode-metadata">
			<PlayerPlaybackRate />
			<PlayerTimestamp />
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--svpod--bg-base);
		color: var(--svpod--fg-base);
	}

	.podcast-player-episode-details {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
	}

	.svpod--player-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
</style>
