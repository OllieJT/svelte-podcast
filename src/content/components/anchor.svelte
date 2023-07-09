<script lang="ts">
	import { topics } from '$content/utility/anchor-registry';
	import { Hashtag } from '@inqling/svelte-icons/heroicon-24-outline';

	export let value: string;
	$: id = topics.slugify(value || '');
	topics.add(value);
</script>

<a href="/#{id}" class="group relative -ml-[1em] hover:text-black">
	<Hashtag
		class="h-[1em] w-[1em] -translate-x-1 text-mono-300 group-hover:text-primary-600"
	/><span class="underline decoration-primary-50/0 decoration-4 group-hover:decoration-primary-500"
		>{value}</span
	>
	<span class="pointer-events-none absolute -top-10 h-px w-px" {id} />
</a>
