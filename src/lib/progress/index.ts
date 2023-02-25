import { _current_time, _src } from '$lib/audio/_private';
import { _episode_progress_map } from '$lib/progress/_private';
import type { AudioLoadOptions } from '$lib/types';
import { info } from '$lib/utility/package/log';
import { get } from 'svelte/store';
import { load_all, save_all } from './local-storage';

export const podcast_progress = {
	episodes: {
		set: (src: string, current_time: number) => _episode_progress_map.set(src, current_time),
		get: _episode_progress_map.get,
		includes: _episode_progress_map.has,
		forEach: _episode_progress_map.forEach,
		count: _episode_progress_map.size,
		data: [..._episode_progress_map],
	},
	stash() {
		const src = get(_src);
		if (!src) return;
		info('saving progress: ', src);
		podcast_progress.episodes.set(src, get(_current_time));
		save_all();
	},
	use(src: string): Pick<AudioLoadOptions, 'start_at'> | null {
		const start_at = _episode_progress_map.get(src);

		if (!start_at) return null;

		info('found saved progress: ', src, start_at);

		return { start_at: start_at };
	},
	save_all,
	load_all,
	clear_all() {
		_episode_progress_map.clear();
		save_all();
	},
};
