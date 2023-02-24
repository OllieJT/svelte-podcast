import {
	audio_autoplay,
	audio_current_time,
	audio_element,
	audio_metadata,
	audio_muted,
	audio_playback_rate,
	audio_src,
	audio_start_at,
	audio_volume,
} from '$lib/context/audio-internals';
import { secondsToTimestamp } from '$lib/utility/seconds-to-timestamp';
import { info, warn } from '$pkg/log';
import clamp from 'just-clamp';
import { derived } from 'svelte/store';

const audio_state = derived(
	[
		audio_metadata,
		audio_autoplay,
		audio_current_time,
		audio_muted,
		audio_playback_rate,
		audio_src,
		audio_volume,
	],
	([$metadata, $autoplay, $current_time, $muted, $playback_rate, $src, $volume]) => {
		return {
			...$metadata,
			autoplay: $autoplay,
			current_time: $current_time,
			timestamp: secondsToTimestamp($current_time),
			muted: $muted,
			playback_rate: $playback_rate,
			src: $src,
			volume: $volume,
		};
	},
);

type HandleType = 'toggle' | 'set';

function play(type: HandleType = 'set') {
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
function pause(type: HandleType = 'set') {
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

function mute(type: HandleType = 'set') {
	info('mute: ', type);
	if (type === 'toggle') {
		audio_muted.update((muted) => !muted);
	} else {
		audio_muted.set(true);
	}
}
function unmute(type: HandleType = 'set') {
	info('unmute: ', type);
	if (type === 'toggle') {
		audio_muted.update((muted) => !muted);
	} else {
		audio_muted.set(false);
	}
}

type LoadOptions = {
	autoplay: boolean;
	start_at?: number;
};

function load(src: string, opts: LoadOptions) {
	info('load: ', src);
	audio_autoplay.set(opts.autoplay);
	audio_volume.set(1);
	audio_src.set(src);
	audio_start_at.set(opts.start_at || 0);
	// opts.current_time ? seek(opts.current_time) : null;
	//opts.autoplay && play();
}
function unload() {
	info('unload: ');
	pause();
	audio_autoplay.set(false);
	audio_volume.set(1);
	audio_src.set('');
	audio_start_at.set(0);
}

function setPlaybackRate(rate: number) {
	info('setPlaybackRate: ', rate);
	audio_playback_rate.set(clamp(0, 10, rate));
}

function seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start') {
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

function skip(seconds: number, type: 'forward' | 'backward' = 'forward') {
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

export const audio = {
	subscribe: audio_state.subscribe,
	play,
	pause,
	mute,
	unmute,
	load,
	unload,
	setPlaybackRate,
	seek,
	skip,
};
