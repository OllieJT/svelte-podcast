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
	<div class="svpod--episode-details">
		{#if title}<span> {title} </span>{/if}
		<PlayerProgress />
		<div class="svpod--episode-metadata">
			<PlayerPlaybackRate />
			<PlayerTimestamp />
		</div>
	</div>
</article>

<style>
	article {
		font-family: var(--svpod--font);
		--player-bg: var(--svpod--bg-base);
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--player-bg);
		color: var(--svpod--fg-base);
		gap: 12px;
		padding: 8px;
		accent-color: var(--svpod--fg-accent);
	}

	.svpod--episode-details {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		gap: 8px;
		padding: 0 4px;
	}

	.svpod--player-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.svpod--episode-metadata {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
</style>
