import { episode_audio, episode_progress } from '$lib/audio';
import { _episode_progress_map } from '$lib/progress/_private';
import type { AudioLoadOptions } from '$lib/types';
import { info } from '$lib/utility/package/log';
import { get } from 'svelte/store';
import { load_all, save_all } from './local-storage';

const get_src_pathname = (src: string) => {
	if (src.startsWith('http')) return new URL(src).pathname;
	else return new URL(src, 'https://svelte.dev').pathname;
};

export const podcast_progress = {
	data: _episode_progress_map,
	stash() {
		const audio = get(episode_audio);
		console.log('audio', audio);
		if (!audio?.src) return;
		info('saving progress: ', audio.src);
		const pathname = get_src_pathname(audio.src);
		_episode_progress_map.set(pathname, get(episode_progress).current_time);
		save_all();
	},
	get(src: string): Pick<AudioLoadOptions, 'start_at'> | null {
		const start_at = _episode_progress_map.get(src);

		if (!start_at) return null;

		info('found saved progress: ', src, start_at);

		return { start_at: start_at };
	},
	save: save_all,
	load: load_all,
	clear_all() {
		_episode_progress_map.clear();
		save_all();
	},
};
