import { format_code } from '../../../layout/helper';
import { default as audio_load_src } from './audio-load.js?raw';
import { default as audio_mute_src } from './audio-mute.js?raw';
import { default as audio_pause_src } from './audio-pause.js?raw';
import { default as audio_play_src } from './audio-play.js?raw';
import { default as audio_seek_src } from './audio-seek.js?raw';
import { default as audio_skip_src } from './audio-skip.js?raw';
import { default as audio_subscribe_src } from './audio-subscribe.svelte?raw';
import { default as audio_unload_src } from './audio-unload.js?raw';
import { default as audio_unmute_src } from './audio-unmute.js?raw';
import { default as load_audio_after_click_src } from './load-audio-after-click.svelte?raw';
import { default as load_audio_after_mount_src } from './load-audio-after-mount.svelte?raw';
import { default as seconds_to_timestamp_src } from './seconds-to-timestamp?raw';
import { default as user_preferences_clear_src } from './user_preferences-clear?raw';
import { default as user_preferences_set_playback_rate_src } from './user_preferences-set_playback_rate?raw';
import { default as user_preferences_set_volume_src } from './user_preferences-set_volume?raw';
import { default as user_preferences_subscribe_src } from './user_preferences-subscribe.svelte?raw';
import { default as user_progress_clear_src } from './user_progress-clear?raw';
import { default as user_progress_get_src } from './user_progress-get?raw';
import { default as user_progress_save_src } from './user_progress-save?raw';
import { default as user_progress_subscribe_src } from './user_progress-subscribe.svelte?raw';

export const load_audio_after_click = format_code(load_audio_after_click_src);
export const load_audio_after_mount = format_code(load_audio_after_mount_src);
export const seconds_to_timestamp = format_code(seconds_to_timestamp_src);
export const audio_load = format_code(audio_load_src);
export const audio_play = format_code(audio_play_src);
export const audio_unload = format_code(audio_unload_src);
export const audio_pause = format_code(audio_pause_src);
export const audio_skip = format_code(audio_skip_src);
export const audio_seek = format_code(audio_seek_src);
export const audio_mute = format_code(audio_mute_src);
export const audio_unmute = format_code(audio_unmute_src);
export const user_preferences_clear = format_code(user_preferences_clear_src);
export const user_preferences_set_playback_rate = format_code(
	user_preferences_set_playback_rate_src,
);
export const user_preferences_set_volume = format_code(
	user_preferences_set_volume_src,
);
export const user_preferences_subscribe = format_code(
	user_preferences_subscribe_src,
);
export const audio_subscribe = format_code(audio_subscribe_src);
export const user_progress_clear = format_code(user_progress_clear_src);
export const user_progress_get = format_code(user_progress_get_src);
export const user_progress_save = format_code(user_progress_save_src);
export const user_progress_subscribe = format_code(user_progress_subscribe_src);
