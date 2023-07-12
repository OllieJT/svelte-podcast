<script>
	import { user_preferences } from 'svelte-podcast';

	// return the current user preferences
	const preferences = $user_preferences;

	// or subscribe to changes in the user preferences
	user_preferences.subscribe((prefs) => {
		// do something with the new preferences whenever they change
		console.log(prefs);
	});
</script>

<p>Listening at {preferences.playback_rate * 100}% speed.</p>

<p>Volume set to {preferences.volume * 100}%.</p>
