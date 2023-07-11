import { default as load_audio_after_click_src } from './load-audio-after-click.svelte?raw';
import { default as load_audio_after_mount_src } from './load-audio-after-mount.svelte?raw';
import { default as load_audio_local_src } from './load-audio-local?raw';
import { default as load_audio_remote_src } from './load-audio-remote?raw';
import { default as override_episode_state_src } from './override-episode-state?raw';
import { default as seconds_to_timestamp_src } from './seconds-to-timestamp?raw';

const format_code = (/** @type {string} */ code) => code.replaceAll('\t', '  ');

export const load_audio_after_click = format_code(load_audio_after_click_src);
export const load_audio_after_mount = format_code(load_audio_after_mount_src);
export const load_audio_local = format_code(load_audio_local_src);
export const load_audio_remote = format_code(load_audio_remote_src);
export const override_episode_state = format_code(override_episode_state_src);
export const seconds_to_timestamp = format_code(seconds_to_timestamp_src);
