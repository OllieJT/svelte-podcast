<script lang="ts">
	export let options: number[] = [1, 1.25, 1.5, 1.75, 2];
</script>

<div class={$$props.class}>
	{#each options as value}
		{@const id = `svpod--speed-option-${value}`}
		<slot {id} {value} />
	{/each}
</div>
