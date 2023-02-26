<script lang="ts">
	import { episode_audio } from '$lib/audio';
</script>

<button on:click={() => episode_audio.play('toggle')} class="svpod--icon-button svpod--rounded">
	{#if $episode_audio?.is_paused}
		<span class="svpod--a11y-hidden">Play</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
			/>
		</svg>
	{:else}
		<span class="svpod--a11y-hidden">Pause</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"
			/>
		</svg>
	{/if}
</button>

<style>
	button {
	}

	svg {
		width: 20px;
		height: 20px;
		display: block;
	}
</style>
