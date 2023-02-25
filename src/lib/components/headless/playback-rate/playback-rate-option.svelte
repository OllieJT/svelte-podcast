<script lang="ts">
	import { user_preferences } from '$lib/user';

	export let id: string;
	export let value: number;
</script>

<label class={$$props.class} for={id}>{value}x</label>
<input
	class="svelte-podcast-a11y-hidden"
	type="radio"
	{id}
	{value}
	name="svelte-podcast-speed-option"
	on:change={(e) => {
		const value = parseFloat(e.currentTarget.value);
		user_preferences.set.playback_rate(value);
	}}
/>
