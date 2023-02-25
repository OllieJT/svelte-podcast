import { _user_preferences } from '$lib/preferences/_private';
import type { UserPreferences } from '$lib/types';
import clamp from 'just-clamp';
import { save } from './local-storage';

function clamp_preferences(prefs: UserPreferences) {
	return {
		playback_rate: clamp(prefs.playback_rate, 0.5, 5),
		volume: clamp(prefs.volume, 0, 1),
	};
}

export function edit_preference(prefs: Partial<UserPreferences>) {
	_user_preferences.update((prev) => clamp_preferences({ ...prev, ...prefs }));
	save();
}
