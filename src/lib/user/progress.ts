import { persisted } from 'svelte-local-storage-store';
import { get } from 'svelte/store';
import { episode_audio, episode_progress } from '../audio';
import type { UserProgress } from '../types';
import { get_pathname_from_url } from '../utility';
import { info } from '../utility/package/log';

const _default_user_progress = {} satisfies UserProgress;
const _user_progress = persisted<UserProgress>('USER_PROGRESS', _default_user_progress);

const save = () => {
	const audio = get(episode_audio);
	if (!audio?.src) return;

	info('saving progress: ', audio.src);

	const pathname = get_pathname_from_url(audio.src);
	const current_time = get(episode_progress).current_time;
	_user_progress.update((prev) => ({ ...prev, [pathname]: current_time }));
};

export const user_progress = {
	subscribe: _user_progress.subscribe,
	get: (src: string) => get(_user_progress)[get_pathname_from_url(src)],
	save,
	clear: () => _user_progress.set(_default_user_progress),
};
