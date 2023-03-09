<script lang="ts">
	import Content from '$docs/content.svelte';
	import Hero from '$docs/homepage-hero.svelte';
	import { onMount } from 'svelte';
	import { episode_audio, episode_progress } from 'svelte-podcast';
	import type { CodeBlockProps } from 'svhighlight/code/CodeBlock.svelte';

	import { topics } from '../docs/utility/anchor-registry';

	const sources = {
		syntax: {
			src: `/example-syntax.mp3`,
			title: `Supper Club × Rich Harris, Author of Svelte`,
			artwork: `https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg`,
		},
		knomii: {
			src: `/example-knomii.mp3`,
			title: `Empowerment starts with letting go of control`,
			artwork: `https://ssl-static.libsyn.com/p/assets/f/a/8/d/fa8d56d5226884335f2e77a3093c12a1/ep-6.png`,
		},
	} as const;

	onMount(() => {
		// load the episode on mount without any metadata
		episode_audio.load('/example-knomii.mp3', {
			/* optional metadata */
		});
	});

	let current_time = 0;
	$: current_time = $episode_progress.current_time;

	$: console.log('details :: ', $episode_audio?.details);

	const code_opts = {
		background: 'bg-mono-900',
		focusType: 'highlight',
		highlightColor: 'bg-mono-800',
		headerClasses: 'bg-mono-800',
	} satisfies CodeBlockProps;
</script>

<Hero />

<Content />

<pre class="w-full max-w-xs overflow-scroll">{JSON.stringify(
		$topics.map((label) => ({ label, slug: topics.slugify(label) })),
	)}</pre>
