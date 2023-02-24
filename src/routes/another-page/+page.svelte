<script lang="ts">
	import { audio } from '$lib';

	let current_time = 0;
	$: current_time = $audio.current_time;
</script>

<h1>Demo</h1>

<a href="/">Demo</a>

<pre>{JSON.stringify($audio, null, 3)}</pre>
