import { episode_audio, episode_progress } from '$lib/audio';
import { _episode_progress_map } from '$lib/progress/_private';
import type { AudioLoadOptions } from '$lib/types';
import { info } from '$lib/utility/package/log';
import { get } from 'svelte/store';
import { load_podcast_progress, save_podcast_progress } from './db-local-storage';

const get_src_pathname = (src: string) => {
	if (src.startsWith('http')) return new URL(src).pathname;
	else return new URL(src, 'https://svelte.dev').pathname;
};

const stash_episode_progress = () => {
	const audio = get(episode_audio);
	console.log('audio', audio);
	if (!audio?.src) return;
	info('saving progress: ', audio.src);
	const pathname = get_src_pathname(audio.src);
	_episode_progress_map.set(pathname, get(episode_progress).current_time);
	save_podcast_progress();
};

const get_episode_progress = (src: string): Pick<AudioLoadOptions, 'start_at'> | null => {
	const pathname = get_src_pathname(src);
	const start_at = _episode_progress_map.get(pathname);

	if (!start_at) return null;

	info('found saved progress: ', pathname, start_at);

	return { start_at: start_at };
};

const clear = () => {
	_episode_progress_map.clear();
	save_podcast_progress();
};

export const podcast_progress = {
	stash_episode: stash_episode_progress,
	get_episode: get_episode_progress,
	load: load_podcast_progress,
	clear,
};
