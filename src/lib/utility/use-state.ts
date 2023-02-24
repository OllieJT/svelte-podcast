import { episode_progress } from '$lib/context/episode-progress';
import { user_preferences } from '$lib/context/user-preferences';

export function save_podcast_state() {
	episode_progress.save_all();
	user_preferences.save();
}

export function load_podcast_state() {
	episode_progress.load_all();
	user_preferences.load();
}
