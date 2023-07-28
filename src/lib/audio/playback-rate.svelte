<script>
	import { user_preferences } from 'svelte-podcast';

	export let options = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];
</script>

<select
	{...$$restProps}
	value={$user_preferences.playback_rate}
	on:change={(e) => {
		const value = parseFloat(e.currentTarget.value);
		user_preferences.set_playback_rate(value);
	}}
>
	{#each options as value}
		<option {value}>
			{#if Number.isInteger(value)}
				{value}.0
			{:else}
				{value}
			{/if}
		</option>
	{/each}
</select>

<style lang="postcss">
	select {
		appearance: none;
		background-image: none;
		text-align: center;
		text-align-last: center;
		border: none;
		margin: 0;
		padding: 0;

		&::before,
		&::after {
			content: none;
		}
	}
</style>
