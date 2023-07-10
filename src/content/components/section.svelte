<script>
	/** @type {string} */
	export let labelledby;
</script>

<div class="relative mx-auto w-full max-w-prose p-4 text-lg sm:px-6 lg:px-8">
	<section class="w-full" aria-labelledby={labelledby}>
		<slot />
	</section>
</div>
