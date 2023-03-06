<script lang="ts">
	import { user_preferences } from '../../user';

	export let options: number[] = [1, 1.25, 1.5, 1.75, 2];
</script>

<select
	class={$$props.class}
	value={$user_preferences.playback_rate}
	on:change={(e) => {
		const value = parseFloat(e.currentTarget.value);
		user_preferences.set.playback_rate(value);
	}}
>
	{#each options as value}
		<option {value}>{value}x Speed</option>
	{/each}
</select>
