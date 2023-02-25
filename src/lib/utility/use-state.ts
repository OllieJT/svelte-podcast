import { podcast_preferences } from '$lib/preferences';
import { podcast_progress } from '$lib/progress';

export function save_podcast_state() {
	podcast_progress.save();
	podcast_preferences.save();
}

export function load_podcast_state() {
	podcast_progress.load();
	podcast_preferences.load();
}
