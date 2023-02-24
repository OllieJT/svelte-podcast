import { browser } from '$app/environment';
import { info, warn } from '$lib/utility/package/log';
import clamp from 'just-clamp';
import { writable } from 'svelte/store';

export type UserPreferences = {
	playback_rate: number;
	volume: number;
};

const default_user_preferences = {
	playback_rate: 1,
	volume: 1,
} satisfies UserPreferences;

const user_preference_store = writable<UserPreferences>(default_user_preferences);

function clamp_preferences(prefs: UserPreferences) {
	return {
		playback_rate: clamp(prefs.playback_rate, 0.5, 5),
		volume: clamp(prefs.volume, 0, 1),
	};
}

function set_preference(prefs: Partial<UserPreferences>) {
	user_preference_store.update((prev) => clamp_preferences({ ...prev, ...prefs }));
	save();
}
const USER_PREFERENCE_KEY = 'USER_PREFERENCE' as const;

function save() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	return user_preference_store.subscribe((prefs) => {
		info(`Saving user preferences to localStorage`, prefs);
		localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(prefs));
	})();
}

function load() {
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
	set_preference(preferences);
	info(`Loaded user preferences from localStorage`, preferences);
}

function clear() {
	user_preference_store.set(default_user_preferences);
	save();
}

export const user_preferences = {
	subscribe: user_preference_store.subscribe,
	set: set_preference,
	save,
	load,
	clear,
};
