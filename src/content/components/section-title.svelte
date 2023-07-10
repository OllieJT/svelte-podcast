<script>
	import Anchor from './anchor.svelte';

	/** @type {string} */
	export let title;
</script>

<h2 class="text-3xl font-normal leading-loose text-primary-600">
	<Anchor value={title} />
</h2>
