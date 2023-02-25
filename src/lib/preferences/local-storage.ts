import { browser } from '$app/environment';
import { edit_preference } from '$lib/preferences/edit';
import { _user_preferences } from '$lib/preferences/_private';
import type { UserPreferences } from '$lib/types';
import { info, warn } from '$lib/utility/package/log';

const USER_PREFERENCE_KEY = 'USER_PREFERENCE' as const;

export function save() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	return _user_preferences.subscribe((prefs) => {
		info(`Saving user preferences to localStorage`, prefs);
		localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(prefs));
	})();
}

export function load() {
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
	edit_preference(preferences);

	info(`Loaded user preferences from localStorage`, preferences);
}
