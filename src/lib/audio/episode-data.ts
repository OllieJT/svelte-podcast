import clamp from 'just-clamp';
import { derived, get, type Readable } from 'svelte/store';
import type { EpisodeAttributes, EpisodeDetails } from '../types';
import { user_preferences, user_progress } from '../user';
import { warn } from '../utility/package/log';
import { audio_element } from './audio-element';
import { episode_details } from './episode-details';

const default_episode_attributes = {
	will_autoplay: false,
	is_paused: true,
	duration: 0,
	start_at: 0,
	details: null,
} satisfies Omit<EpisodeAttributes, 'src'>;

type EpisodeAttributesStore = Readable<EpisodeAttributes | null>;

const episode_attributes = derived([audio_element, episode_details], ([$audio, $details], set) => {
	if (!$audio) return set(null);

	function set_value() {
		if (!$audio?.src) return null;
		set({
			...default_episode_attributes,
			src: $audio.src,
			duration: $audio.duration,
			details: $details,
			will_autoplay: $audio.autoplay,
			is_paused: $audio.paused,
			start_at: user_progress.get($audio.src) ?? 0,
		});
	}

	$audio.addEventListener('loadeddata', set_value);
	$audio.addEventListener('pause', set_value);
	$audio.addEventListener('playing', set_value);

	return () => {
		$audio.removeEventListener('loadeddata', set_value);
		$audio.removeEventListener('pause', set_value);
		$audio.removeEventListener('playing', set_value);
	};
}) satisfies EpisodeAttributesStore;

type HandleType = 'toggle' | 'set';

const no_element = (action: string) => warn(`could not ${action} :: no audio element exists yet`);

export const episode_audio = {
	subscribe: episode_attributes.subscribe,
	load: (src: string, details: EpisodeDetails) => {
		user_progress.save();
		const el = get(audio_element);
		if (!el) return no_element('load');
		el.src = src;
		el.muted = false;

		// using user_progress
		const start_at = user_progress.get(src) || 0;
		el.currentTime = start_at;

		// using user_preferences
		const preferences = get(user_preferences);
		el.playbackRate = preferences.playback_rate;
		el.volume = preferences.volume;

		episode_details.set(details);
	},
	unload: () => {
		user_progress.save();
		const el = get(audio_element);
		if (!el) return no_element('unload');
		el.src = '';
		episode_details.set(null);
	},
	play: (t?: HandleType) => {
		const el = get(audio_element);
		if (!el) return no_element('play');

		if (t === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.play();
		}
	},
	pause: (t?: HandleType) => {
		user_progress.save();
		const el = get(audio_element);
		if (!el) return no_element('pause');

		if (t === 'toggle') {
			el.paused ? el.play() : el.pause();
		} else {
			el.pause();
		}
	},
	mute: (t?: HandleType) => {
		const el = get(audio_element);
		if (!el) return no_element('mute');

		if (t === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = true;
		}
	},
	unmute: (t?: HandleType) => {
		const el = get(audio_element);
		if (!el) return no_element('unmute');

		if (t === 'toggle') {
			el.muted = !el.muted;
		} else {
			el.muted = false;
		}
	},
	seek(seconds: number, from: 'from-start' | 'from-end' = 'from-start') {
		const el = get(audio_element);
		if (!el) return no_element('seek');

		if (from === 'from-end') {
			el.currentTime = clamp(0, el.duration, el.duration - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, seconds);
		}
	},
	skip(seconds: number, type: 'forward' | 'backward' = 'forward') {
		const el = get(audio_element);
		if (!el) return no_element('skip');

		if (type === 'backward') {
			el.currentTime = clamp(0, el.duration, el.currentTime - seconds);
		} else {
			el.currentTime = clamp(0, el.duration, el.currentTime + seconds);
		}
	},
};
