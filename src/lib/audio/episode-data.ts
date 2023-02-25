import { audio_element, type AudioElementStore } from '$lib/audio/audio-element';
import { episode_details, type EpisodeDetailsStore } from '$lib/audio/episode-details';
import { podcast_preferences } from '$lib/preferences';
import { podcast_progress } from '$lib/progress';
import type { EpisodeAttributes, EpisodeDetails } from '$lib/types';
import { warn } from '$lib/utility/package/log';
import clamp from 'just-clamp';
import { derived, get } from 'svelte/store';

const default_episode_attributes = {
	will_autoplay: false,
	is_muted: false,
	duration: 0,
	start_at: 0,
	details: null,
} satisfies Omit<EpisodeAttributes, 'src'>;

const episode_attributes = derived<
	[AudioElementStore, EpisodeDetailsStore],
	EpisodeAttributes | null
>([audio_element, episode_details], ([$audio, $details], set) => {
	if (!$audio) return set(null);

	function set_value() {
		if (!$audio?.src) return null;
		set({
			...default_episode_attributes,
			src: $audio.src,
			duration: $audio.duration,
			details: $details,
		});
	}

	$audio.addEventListener('loadeddata', () => set_value());
	return () => $audio.removeEventListener('loadeddata', () => set_value());
});

type HandleType = 'toggle' | 'set';

const no_element = (action: string) => warn(`could not ${action} :: no audio element exists yet`);

export const episode_audio = {
	subscribe: episode_attributes.subscribe,
	load: (src: string, details: EpisodeDetails) => {
		podcast_progress.stash();
		const el = get(audio_element);
		if (!el) return no_element('load');
		const progress = podcast_progress.get(src);
		el.src = src;
		console.log('progress', progress);
		console.log('src', src);
		console.log('podcast_progress', podcast_progress.data);
		el.currentTime = progress?.start_at || 0;

		const preferences = get(podcast_preferences);
		el.playbackRate = preferences.playback_rate;
		el.volume = preferences.volume;

		episode_details.set(details);
	},
	unload: () => {
		podcast_progress.stash();
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
		podcast_progress.stash();
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
