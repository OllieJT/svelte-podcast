import {
	audio_autoplay,
	audio_current_time,
	audio_duration,
	audio_element,
	audio_ended,
	audio_loading,
	audio_muted,
	audio_paused,
	audio_src,
	audio_start_at,
} from '$lib/context/audio-internals';
import { audio_metadata, type AudioMetadata } from '$lib/context/audio-metadata';
import { episode_progress } from '$lib/context/episode-progress';
import { user_preferences } from '$lib/context/user-preferences';
import { secondsToTimestamp } from '$lib/utility/seconds-to-timestamp';
import { info, warn } from '$pkg/log';
import clamp from 'just-clamp';
import { derived } from 'svelte/store';

const audio_state = derived(
	[
		audio_current_time,
		audio_duration,
		audio_ended,
		audio_loading,
		audio_paused,
		audio_start_at,
		audio_autoplay,
		audio_muted,
		audio_src,
		audio_metadata,
		user_preferences,
	],
	([
		$current_time,
		$duration,
		$ended,
		$loading,
		$paused,
		$start_at,
		$autoplay,
		$muted,
		$src,
		$metadata,
		$user_preferences,
	]) => {
		return {
			current_time: $current_time,
			duration: $duration,
			ended: $ended,
			loading: $loading,
			paused: $paused,
			start_at: $start_at,
			autoplay: $autoplay,
			muted: $muted,
			src: $src,
			metadata: $metadata,
			playback_rate: $user_preferences.playback_rate,
			volume: $user_preferences.volume,
			timestamp: secondsToTimestamp($current_time),
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

export type AudioLoadData = AudioMetadata & { src: string };

export type AudioLoadOptions = {
	autoplay: boolean;
	start_at?: number;
};

const load = (data: AudioLoadData, opts: AudioLoadOptions) => {
	episode_progress.stash();

	const { src, ...metadata } = data;
	const progress = episode_progress.use(src);
	const start_at = progress?.start_at || opts.start_at || 0;

	console.log('progress', progress);

	info('load: ', src);
	audio_autoplay.set(opts.autoplay);
	audio_src.set(src);
	audio_metadata.set(metadata);
	audio_start_at.set(start_at);
	// opts.current_time ? seek(opts.current_time) : null;
	//opts.autoplay && play();
};
function unload() {
	episode_progress.stash();
	info('unload: ');
	pause();
	audio_autoplay.set(false);
	audio_src.set('');
	audio_metadata.set(null);
	audio_start_at.set(0);
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
	seek,
	skip,
};
