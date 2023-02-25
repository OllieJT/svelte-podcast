import { user_preferences } from '$lib/preferences';
import { podcast_progress } from '$lib/progress';

export function load_podcast_state() {
	podcast_progress.load();
	user_preferences.load();
}
