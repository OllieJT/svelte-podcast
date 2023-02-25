<script lang="ts">
	import {
		podcast_data,
		podcast_duration,
		podcast_loading,
		podcast_muted,
		podcast_options,
		podcast_paused,
		podcast_preferences,
		podcast_time,
	} from '$lib';
</script>

<h1>Demo</h1>

<a href="/">Demo</a>

<pre>{JSON.stringify(
		{
			podcast_time,
			podcast_data,
			podcast_options,
			podcast_duration,
			podcast_loading,
			podcast_paused,
			podcast_muted,
			podcast_preferences,
		},
		null,
		3,
	)}</pre>
