import { browser } from '$app/environment';
import { audio, type AudioLoadOptions } from '$lib/context/audio';
import { error, info, warn } from '$lib/utility/package/log';

export type EpisodeProgress = {
	current_time: number;
};

const episode_progress_map = new Map<string, EpisodeProgress>();

function stash_episode() {
	return audio.subscribe((state) => {
		info('saving progress: ', state.src);
		if (!state.src) return;
		episode_progress_map.set(state.src, { current_time: state.current_time });
	})();
}

function use_episode(src: string): Pick<AudioLoadOptions, 'start_at'> | null {
	const progress = episode_progress_map.get(src);

	if (!progress) return null;

	info('found saved progress: ', progress);

	return { start_at: progress.current_time };
}

type SavedEpisodeProgress = EpisodeProgress & { src: string };
const EPISODE_PROGRESS_KEY = 'EPISODE_PROGRESS' as const;

function save_all() {
	if (!browser || !localStorage) {
		warn('localStorage not available, skipping save');
		return;
	}
	const items = [...episode_progress_map];

	const episodes = items.reduce((prev, [src, progress]) => {
		return [...prev, { src, ...progress }];
	}, [] as SavedEpisodeProgress[]);

	info(`Saving progress for ${episodes.length} episodes to localStorage`, episodes);
	localStorage.setItem(EPISODE_PROGRESS_KEY, JSON.stringify(episodes));
}

function load_all() {
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
		episodes.forEach(({ src, ...progress }) => {
			episode_progress_map.set(src, progress);
		});
		info(`Loaded ${episode_progress_map.size} episodes progress from localStorage`);
	} catch (e) {
		error('Error loading episode progress', e);
		return;
	}
}

export const episode_progress = {
	stash: stash_episode,
	use: use_episode,
	save_all,
	load_all,
};
