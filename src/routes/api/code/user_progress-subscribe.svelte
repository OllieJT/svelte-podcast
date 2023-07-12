<script>
	import { user_progress } from 'svelte-podcast';

	// return the current user progress
	const progress = $user_progress;

	// or subscribe to changes in the user progress
	user_progress.subscribe((prog) => {
		// do something with the new progress whenever they change
		console.log(prog);
	});
</script>

<p>
	Listened to {progress['https://example.com/episodes/1']} seconds of episode 1.
</p>
