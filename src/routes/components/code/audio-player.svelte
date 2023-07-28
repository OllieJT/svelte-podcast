<script>
	// @ts-nocheck

	import { AudioPlayer } from 'svelte-podcast';

	/** @type { string | undefined} */
	let src = '/static/example-syntax.mp3';
</script>

<AudioPlayer
	src="/static/example-syntax.mp3"
	metadata={{
		title: `Supper Club × Rich Harris, Author of Svelte`,
		artwork: `https://ssl-static.libsyn.com/p/assets/b/3/c/d/b3cdf28da11ad39fe5bbc093207a2619/Syntax_-_499.jpg`,
	}}
	let:Player
	let:action
	let:attributes
>
	<pre>{JSON.stringify({ attributes }, null, 3)}</pre>
</AudioPlayer>
