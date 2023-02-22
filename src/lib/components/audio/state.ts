import clamp from 'just-clamp';
import { derived, writable } from 'svelte/store';

export const _src = writable<string | undefined>(undefined);
export const _duration = writable<number>(0);

export const _currentTime = writable<number>(0);
export const _muted = writable<boolean>(false);
export const _paused = writable<boolean>(true);
export const _playbackRate = writable<number>(1);
export const _seek = writable<number>(0);
export const _volume = writable<number>(1);

const state = derived(
	[_src, _currentTime, _duration, _muted, _paused, _playbackRate, _volume, _seek],
	([$src, $currentTime, $duration, $muted, $paused, $playbackRate, $volume, $seek]) => {
		const currentTime = $currentTime > $duration ? $duration : $currentTime;

		return {
			src: $src,
			duration: $duration,

			currentTime,
			muted: $muted,
			paused: $paused,
			playbackRate: $playbackRate,
			seek: $seek,
			volume: $volume,
		};
	},
);

type AudioState = Parameters<Parameters<(typeof state)['subscribe']>[0]>[0];
type PlayerState = Omit<AudioState, 'src' | 'duration'>;
const default_player_state: PlayerState = {
	currentTime: 0,
	muted: false,
	paused: true,
	playbackRate: 1,
	seek: 0,
	volume: 1,
};

export function resetAudio() {
	_currentTime.set(0);
	_duration.set(0);
	_muted.set(false);
	_paused.set(true);
	_playbackRate.set(1);
	_volume.set(1);
}

function set_player_state(opts?: Partial<PlayerState>) {
	_currentTime.set(opts?.currentTime ?? default_player_state.currentTime);
	_muted.set(opts?.muted ?? default_player_state.muted);
	_paused.set(opts?.paused ?? default_player_state.paused);
	_playbackRate.set(opts?.playbackRate ?? default_player_state.playbackRate);
	_volume.set(opts?.volume ?? default_player_state.volume);
	_seek.set(opts?.seek ?? default_player_state.seek);
}

function unload() {
	set_player_state();
	_duration.set(0);
	_src.set(undefined);
}

function load(src: string, opts?: Partial<PlayerState>) {
	set_player_state(opts);
	_src.set(src);
}

function play() {
	// Incase of a missmatch between the html and js, we first pause and then play
	_paused.set(true);
	_paused.set(false);
}
function pause() {
	// Incase of a missmatch between the html and js, we first play and then pause
	_paused.set(false);
	_paused.set(true);
}

export const audio = {
	subscribe: state.subscribe,
	currentTime: { subscribe: _currentTime.subscribe },
	duration: { subscribe: _duration.subscribe },
	muted: { subscribe: _muted.subscribe },
	paused: { subscribe: _paused.subscribe },
	playbackRate: { subscribe: _playbackRate.subscribe },
	volume: { subscribe: _volume.subscribe },

	load,
	unload,

	seek: (value: number) => {
		console.log('seek', value);
		// let duration = 0
		// _duration.subscribe(d => duration = d)
		return _duration.subscribe((dur) => {
			_seek.set(clamp(0, dur, value));
		});
	},

	toggle_mute: () => _muted.update((previous) => !previous),
	unmute: () => _muted.set(false),
	mute: () => _muted.set(true),

	toggle_pause: () => _paused.update((previous) => !previous),
	play,
	pause: () => _paused.set(true),

	setVolume: (value: number) => _volume.set(clamp(0, 1, value)),
	setPlaybackRate: (value: number) => _playbackRate.set(clamp(0, 10, value)),
};
