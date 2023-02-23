import { dev } from '$app/environment';
import type { PlayerElement, PlayerMetadata } from '$lib/components/audio/types';
import { secondsToTimestamp } from '$lib/helper/s-to-timestamp';
import clamp from 'just-clamp';
import { derived, writable } from 'svelte/store';

function log(...val: (string | number | boolean)[]) {
	if (!dev) return;
	console.info('🎶 ', ...val);
}
function warn(...val: (string | number | boolean)[]) {
	if (!dev) return;
	console.warn('🎶 ', ...val);
}

export const __internal_audio_current_time = writable<number>(0);
export const __internal_audio_src = writable<string | null>(null);
export const __internal_audio_element = writable<PlayerElement>();
export const __internal_audio_metadata = writable<PlayerMetadata>({
	duration: 0,
	muted: false,
	paused: true,
	playbackRate: 1,
	loading: false,
});

const state = derived(
	[__internal_audio_metadata, __internal_audio_current_time],
	([$metadata, $current_time]) => {
		return {
			current_time: $current_time,
			timestamp: secondsToTimestamp($current_time),
			...$metadata,
		};
	},
);

type HandleType = 'toggle' | 'set';

function play(type: HandleType = 'set') {
	log('play: ', type);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.play();
		}
	})();
}
function pause(type: HandleType = 'set') {
	log('pause: ', type);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.pause();
		}
	})();
}

function mute(type: HandleType = 'set') {
	log('mute: ', type);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = true;
		}
	})();
}
function unmute(type: HandleType = 'set') {
	log('unmute: ', type);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = false;
		}
	})();
}

function load(src: string) {
	log('load: ', src);
	__internal_audio_src.set(src);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		el.volume = 1;
		el.pause();
	})();
}
function unload() {
	log('unload: ');
	__internal_audio_src.set(null);
}

function setPlaybackRate(rate: number) {
	log('setPlaybackRate: ', rate);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		el.playbackRate = clamp(0, 10, rate);
	})();
}

function seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start') {
	log('seek: ', seconds, from);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (from === 'from-end') {
			el.currentTime = clamp(0, el.duration, el.duration - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, seconds);
		}
	})();
}

function skip(seconds: number, type: 'forward' | 'backward' = 'forward') {
	log('skip: ', seconds, type);
	return __internal_audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'backward') {
			el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
		}
	})();
}

export const audio = {
	subscribe: state.subscribe,
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
