import { default as add_audio_loader_src } from './add-audio-loader.svelte?raw';
import { default as install_src } from './install.sh?raw';
import { default as load_audio_after_click_src } from './load-audio-after-click.svelte?raw';
import { default as load_audio_after_mount_src } from './load-audio-after-mount.svelte?raw';
import { default as load_audio_local_src } from './load-audio-local?raw';
import { default as load_audio_remote_src } from './load-audio-remote?raw';

const format_code = (/** @type {string} */ code) => code.replaceAll('\t', '  ');

export const add_audio_loader = format_code(add_audio_loader_src);
export const install = format_code(install_src);
export const load_audio_after_click = format_code(load_audio_after_click_src);
export const load_audio_after_mount = format_code(load_audio_after_mount_src);
export const load_audio_local = format_code(load_audio_local_src);
export const load_audio_remote = format_code(load_audio_remote_src);
