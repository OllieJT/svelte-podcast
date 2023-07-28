import { format_code } from '$src/layout/helper';
import { default as player_css_src } from './audio-player.svelte?raw';
import { default as progress_css_src } from './audio-progress.svelte?raw';
export { default as PlayerCss } from './audio-player.svelte';
export { default as ProgressCss } from './audio-progress.svelte';

export const player_css = format_code(player_css_src);
export const progress_css = format_code(progress_css_src);
