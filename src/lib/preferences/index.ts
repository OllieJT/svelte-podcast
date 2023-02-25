import { browser } from '$app/environment';
import { _default_user_preferences, _user_preferences } from '$lib/preferences/_private';
import type { UserPreferences } from '$lib/types';
import { info, warn } from '$lib/utility/package/log';
import clamp from 'just-clamp';

function clamp_preferences(prefs: UserPreferences) {
	return {
		playback_rate: clamp(prefs.playback_rate, 0.5, 5),
		volume: clamp(prefs.volume, 0, 1),
	};
}
const USER_PREFERENCE_KEY = 'USER_PREFERENCE' as const;

function set(prefs: Partial<UserPreferences>) {
	_user_preferences.update((prev) => clamp_preferences({ ...prev, ...prefs }));
	save();
}
function save() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	return _user_preferences.subscribe((prefs) => {
		info(`Saving user preferences to localStorage`, prefs);
		localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(prefs));
	})();
}

export const podcast_preferences = {
	subscribe: _user_preferences.subscribe,
	set,
	save,
	load() {
		if (!browser || !localStorage) {
			warn('localStorage not available, skipping load');
			return;
		}
		const data = localStorage.getItem(USER_PREFERENCE_KEY);

		if (!data) {
			info('No saved user preferences found');
			return;
		}

		const preferences = JSON.parse(data) as UserPreferences;
		set(preferences);
		info(`Loaded user preferences from localStorage`, preferences);
	},
	clear() {
		_user_preferences.set(_default_user_preferences);
		save();
	},
};
