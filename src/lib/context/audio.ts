import {
	audio_autoplay,
	audio_current_time,
	audio_element,
	audio_metadata,
	audio_src,
} from '$lib/context/audio-internals';
import { secondsToTimestamp } from '$lib/utility/seconds-to-timestamp';
import { info, warn } from '$pkg/log';
import clamp from 'just-clamp';
import { derived } from 'svelte/store';

const audio_state = derived([audio_metadata, audio_current_time], ([$metadata, $current_time]) => {
	return {
		current_time: $current_time,
		timestamp: secondsToTimestamp($current_time),
		...$metadata,
	};
});

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
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = true;
		}
	})();
}
function unmute(type: HandleType = 'set') {
	info('unmute: ', type);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		if (type === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = false;
		}
	})();
}

type LoadOptions = {
	autoplay: boolean;
};

function load(src: string, opts: LoadOptions) {
	info('load: ', src);
	audio_autoplay.set(opts.autoplay);
	audio_src.set(src);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		el.volume = 1;
		el.pause();
	})();
}
function unload() {
	info('unload: ');
	audio_src.set(null);
}

function setPlaybackRate(rate: number) {
	info('setPlaybackRate: ', rate);
	return audio_element.subscribe((el) => {
		if (!el) return warn('no audio element');
		el.playbackRate = clamp(0, 10, rate);
	})();
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
