import { browser } from '$app/environment';
import { _episode_progress_map } from '$lib/progress/_private';
import { error, info, warn } from '$lib/utility/package/log';

type SavedEpisodeProgress = { src: string; current_time: number };
const EPISODE_PROGRESS_KEY = 'EPISODE_PROGRESS' as const;

export function save_podcast_progress() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	const items = [..._episode_progress_map];

	console.log('items', items);

	const episodes = items.reduce((prev, [src, current_time]) => {
		return [...prev, { src, current_time }];
	}, [] as SavedEpisodeProgress[]);

	info(`Saving progress for ${episodes.length} episodes to localStorage`, episodes);
	localStorage.setItem(EPISODE_PROGRESS_KEY, JSON.stringify(episodes));
}

export function load_podcast_progress() {
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
			_episode_progress_map.set(src, current_time);
		});
		info(`Loaded ${_episode_progress_map.size} episodes progress from localStorage`);
	} catch (e) {
		error('Error loading episode progress', e);
		return;
	}
}
