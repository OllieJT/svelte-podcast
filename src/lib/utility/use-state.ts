import { podcast_preferences } from '$lib/preferences';
import { podcast_progress } from '$lib/progress';

export function save_podcast_state() {
	podcast_progress.save_all();
	podcast_preferences.save();
}

export function load_podcast_state() {
	podcast_progress.load_all();
	podcast_preferences.load();
}
