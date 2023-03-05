<script lang="ts">
	import { user_preferences } from '$lib/user';

	export let options: number[] = [1, 1.25, 1.5, 1.75, 2];
</script>

<div class="">
	<select
		class={$$props.class}
		value={$user_preferences.playback_rate}
		on:change={(e) => {
			const value = parseFloat(e.currentTarget.value);
			user_preferences.set.playback_rate(value);
		}}
	>
		{#each options as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>

<style>
	div {
		--fg: var(--svpod--fg-base);

		padding: 1px;
		display: flex;
		align-items: stretch;
		justify-content: stretch;
	}

	select {
		appearance: none;
		padding: 0 0.75em;
		border-radius: 2px;
		background: transparent;
		color: var(--fg);
		border: none;
		overflow: hidden;
		letter-spacing: 0.5px;
		font-size: 0.8em;
		line-height: 1em;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
		min-width: 48px;
		outline-color: var(--svpod--fg-accent);
		cursor: pointer;
		margin: 0;
	}

	select,
	select:hover,
	select:focus {
		border: none;
		shadow: none;
	}

	select:hover {
		--fg: var(--svpod--fg-base-hover);
	}
</style>
