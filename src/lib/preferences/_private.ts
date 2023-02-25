import type { UserPreferences } from '$lib/types';
import { writable } from 'svelte/store';

export const _default_user_preferences = {
	playback_rate: 1,
	volume: 1,
} satisfies UserPreferences;

export const _user_preferences = writable<UserPreferences>(_default_user_preferences);
