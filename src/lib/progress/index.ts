import { browser } from '$app/environment';
import { _current_time, _src } from '$lib/audio/_private';
import { _episode_progress_map } from '$lib/progress/_private';
import type { AudioLoadOptions } from '$lib/types';
import { error, info, warn } from '$lib/utility/package/log';
import { get } from 'svelte/store';

type SavedEpisodeProgress = { src: string; current_time: number };
const EPISODE_PROGRESS_KEY = 'EPISODE_PROGRESS' as const;

function save_all() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	const items = [..._episode_progress_map];

	const episodes = items.reduce((prev, [src, current_time]) => {
		return [...prev, { src, current_time }];
	}, [] as SavedEpisodeProgress[]);

	info(`Saving progress for ${episodes.length} episodes to localStorage`, episodes);
	localStorage.setItem(EPISODE_PROGRESS_KEY, JSON.stringify(episodes));
}

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

	load_all() {
		if (!browser || !localStorage) {
			warn('localStorage not available, skipping load');
			return;
		}
		const data = localStorage.getItem(EPISODE_PROGRESS_KEY);

		if (!data) {
			info('No saved episode progress found');
			return;
		}

		const episodes = JSON.parse(data) as SavedEpisodeProgress[];

		try {
			episodes.forEach(({ src, current_time }) => {
				podcast_progress.episodes.set(src, current_time);
			});
			info(`Loaded ${_episode_progress_map.size} episodes progress from localStorage`);
		} catch (e) {
			error('Error loading episode progress', e);
			return;
		}
	},
	clear_all() {
		_episode_progress_map.clear();
		save_all();
	},
};
