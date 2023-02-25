import {
	_autoplay,
	_current_time,
	_duration,
	_element,
	_ended,
	_loading,
	_metadata,
	_muted,
	_paused,
	_src,
	_start_at,
} from '$lib/audio/_private';
import { podcast_progress } from '$lib/progress';
import type { AudioLoadData, AudioLoadOptions } from '$lib/types';
import { secondsToTimestamp } from '$lib/utility/seconds-to-timestamp';
import { info, warn } from '$pkg/log';
import clamp from 'just-clamp';
import { derived } from 'svelte/store';
export { default as AudioLoader } from '$lib/audio/audio-loader.svelte';

export const podcast_time = derived([_current_time, _ended], ([$seconds, $ended]) => ({
	current_time: $seconds,
	timestamp: secondsToTimestamp($seconds),
	ended: $ended,
}));

export const podcast_data = derived(
	[_src, _metadata],
	([$src, $metadata]) =>
		({
			...$metadata,
			src: $src,
		} satisfies AudioLoadData),
);

export const podcast_options = derived(
	[_start_at, _autoplay],
	([$start_at, $autoplay]) =>
		({
			start_at: $start_at,
			autoplay: $autoplay,
		} satisfies AudioLoadOptions),
);

export const podcast_duration = { subscribe: _duration.subscribe };
export const podcast_loading = { subscribe: _loading.subscribe };
export const podcast_paused = { subscribe: _paused.subscribe };
export const podcast_muted = { subscribe: _muted.subscribe };

type HandleType = 'toggle' | 'set';

export const podcast_audio = {
	play(type: HandleType = 'set') {
		info('play: ', type);
		return _element.subscribe((el) => {
			if (!el) return warn('no audio element');
			if (type === 'toggle') {
				el.paused ? el.play() : el.pause();
			} else {
				el.play();
			}
		})();
	},
	pause(type: HandleType = 'set') {
		info('pause: ', type);
		return _element.subscribe((el) => {
			if (!el) return warn('no audio element');
			if (type === 'toggle') {
				el.paused ? el.play() : el.pause();
			} else {
				el.pause();
			}
		})();
	},

	mute(type: HandleType = 'set') {
		info('mute: ', type);
		if (type === 'toggle') {
			_muted.update((muted) => !muted);
		} else {
			_muted.set(true);
		}
	},
	unmute(type: HandleType = 'set') {
		info('unmute: ', type);
		if (type === 'toggle') {
			_muted.update((muted) => !muted);
		} else {
			_muted.set(false);
		}
	},

	load(data: AudioLoadData, opts: AudioLoadOptions) {
		podcast_progress.stash();

		const { src, ...meta } = data;
		const progress = podcast_progress.use(src);
		const start_at = progress?.start_at || opts.start_at || 0;

		console.log('progress', progress);

		info('load: ', src);
		_autoplay.set(opts.autoplay);
		_src.set(src);
		_metadata.set(meta);
		_start_at.set(start_at);
		// opts.current_time ? seek(opts.current_time) : null;
		//opts.autoplay && play();
	},
	unload() {
		podcast_progress.stash();
		info('unload: ');
		_element.subscribe((el) => {
			if (!el) return warn('no audio element');
			el.pause();
		})();
		_autoplay.set(false);
		_src.set('');
		_metadata.set(null);
		_start_at.set(0);
	},

	seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start') {
		info('seek: ', seconds, from);
		return _element.subscribe((el) => {
			if (!el) return warn('no audio element');
			if (from === 'from-end') {
				el.currentTime = clamp(0, el.duration, el.duration - seconds);
			} else {
				el.currentTime = clamp(0, el.duration, seconds);
			}
		})();
	},

	skip(seconds: number, type: 'forward' | 'backward' = 'forward') {
		info('skip: ', seconds, type);
		return _element.subscribe((el) => {
			if (!el) return warn('no audio element');
			if (type === 'backward') {
				el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
			} else {
				el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
			}
		})();
	},
};
