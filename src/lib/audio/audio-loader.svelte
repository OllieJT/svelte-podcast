<script lang="ts">
	import { audio_element } from '$lib/audio/audio-element';
	import { load_podcast_state } from '$lib/utility';
	import { info } from '$lib/utility/package/log';
	import { onMount } from 'svelte';

	onMount(() => {
		load_podcast_state();
		return audio_element.subscribe((el) => {
			info('loaded audio :: ', el);
		});
	});
</script>
