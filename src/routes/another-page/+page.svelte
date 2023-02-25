<script lang="ts">
	import { episode_audio, episode_progress } from '$lib/audio';
</script>

<h1>Demo</h1>

<a href="/">Demo</a>

<pre>{JSON.stringify(
		{
			$episode_audio,
			$episode_progress,
		},
		null,
		3,
	)}</pre>
