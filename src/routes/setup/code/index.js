import { format_code } from '$src/layout/helper';
import { default as add_audio_loader_src } from './add-audio-loader.svelte?raw';
import { default as install_src } from './install.sh?raw';
import { default as load_audio_advanced_src } from './load-audio-advanced?raw';
import { default as load_audio_local_src } from './load-audio-local?raw';
import { default as load_audio_remote_src } from './load-audio-remote?raw';
import { default as override_episode_state_src } from './override-episode-state?raw';

export const add_audio_loader = format_code(add_audio_loader_src);
export const install = format_code(install_src);
export const override_episode_state = format_code(override_episode_state_src);
export const load_audio_local = format_code(load_audio_local_src);
export const load_audio_remote = format_code(load_audio_remote_src);
export const load_audio_advanced = format_code(load_audio_advanced_src);
