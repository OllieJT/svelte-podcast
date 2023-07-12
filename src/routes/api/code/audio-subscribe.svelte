<script>
	import { audio } from 'svelte-podcast';

	// return the current user preferences
	const attributes = $audio;

	// or subscribe to changes in the user preferences
	audio.subscribe((attr) => {
		// do something with the new preferences whenever they change
		console.log(attr);
	});
</script>

<p>Current timestamp {attributes.timestamp_current}.</p>

<p>{attributes.is_paused ? 'Paused...' : 'Playing!'}.</p>
