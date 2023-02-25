import { browser } from '$app/environment';
import { user_preferences } from '$lib/preferences/db-state';

import type { UserPreferences } from '$lib/types';
import { info, warn } from '$lib/utility/package/log';
import { get } from 'svelte/store';

const USER_PREFERENCE_KEY = 'USER_PREFERENCE' as const;

export function save_preferences() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}

	const preferences = get(user_preferences);
	info(`Saving user preferences to localStorage`, preferences);
	localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(preferences));
}

export function load_preferences() {
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
	user_preferences.edit(preferences);

	info(`Loaded user preferences from localStorage`, preferences);
}
