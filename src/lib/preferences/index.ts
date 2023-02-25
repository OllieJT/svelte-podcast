import { edit_preference } from '$lib/preferences/edit';
import { _default_user_preferences, _user_preferences } from '$lib/preferences/_private';
import { load, save } from './local-storage';

export const podcast_preferences = {
	subscribe: _user_preferences.subscribe,
	edit: edit_preference,
	load,
	save,
	clear() {
		_user_preferences.set(_default_user_preferences);
		save();
	},
};
