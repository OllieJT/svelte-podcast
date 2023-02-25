import type { UserPreferences } from '$lib/types';
import clamp from 'just-clamp';
import { persisted } from 'svelte-local-storage-store';

const _default_user_preferences = { playback_rate: 1, volume: 1 } satisfies UserPreferences;
const _user_preferences = persisted<UserPreferences>('USER_PREFERENCE', _default_user_preferences);

export const user_preferences = {
	subscribe: _user_preferences.subscribe,
	set: {
		playback_rate: (value: number) => {
			const playback_rate = clamp(value, 0.5, 5);
			return _user_preferences.update((prefs) => ({ ...prefs, playback_rate }));
		},
		volume: (value: number) => {
			const volume = clamp(value, 0, 1);
			return _user_preferences.update((prefs) => ({ ...prefs, volume }));
		},
	},
	clear: () => _user_preferences.set(_default_user_preferences),
};
