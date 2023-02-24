import {
	audio_autoplay,
	audio_element,
	audio_muted,
	audio_src,
	audio_start_at,
} from '$lib/context/audio-internals';
import { episode_progress } from '$lib/context/episode-progress';
import { metadata } from '$lib/stores';
import type { AudioLoadData, AudioLoadOptions } from '$lib/types';
import { info, warn } from '$pkg/log';
import clamp from 'just-clamp';

type HandleType = 'toggle' | 'set';

export function play(type: HandleType = 'set') {
	info('play: ', type);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.play();
		}
	})();
}
export function pause(type: HandleType = 'set') {
	info('pause: ', type);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.pause();
		}
	})();
}

export function mute(type: HandleType = 'set') {
	info('mute: ', type);
	if (type === 'toggle') {
		audio_muted.update((muted) => !muted);
	} else {
		audio_muted.set(true);
	}
}
export function unmute(type: HandleType = 'set') {
	info('unmute: ', type);
	if (type === 'toggle') {
		audio_muted.update((muted) => !muted);
	} else {
		audio_muted.set(false);
	}
}

export const load = (data: AudioLoadData, opts: AudioLoadOptions) => {
	episode_progress.stash();

	const { src, ...meta } = data;
	const progress = episode_progress.use(src);
	const start_at = progress?.start_at || opts.start_at || 0;

	console.log('progress', progress);

	info('load: ', src);
	audio_autoplay.set(opts.autoplay);
	audio_src.set(src);
	metadata.set(meta);
	audio_start_at.set(start_at);
	// opts.current_time ? seek(opts.current_time) : null;
	//opts.autoplay && play();
};
export function unload() {
	episode_progress.stash();
	info('unload: ');
	pause();
	audio_autoplay.set(false);
	audio_src.set('');
	metadata.set(null);
	audio_start_at.set(0);
}

export function seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start') {
	info('seek: ', seconds, from);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (from === 'from-end') {
			el.currentTime = clamp(0, el.duration, el.duration - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, seconds);
		}
	})();
}

export function skip(seconds: number, type: 'forward' | 'backward' = 'forward') {
	info('skip: ', seconds, type);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'backward') {
			el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
		}
	})();
}
