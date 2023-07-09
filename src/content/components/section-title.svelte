<script lang="ts">
	import Anchor from './anchor.svelte';

	export let title: string;
</script>

<h2 class="text-3xl font-normal leading-loose text-primary-600">
	<Anchor value={title} />
</h2>
