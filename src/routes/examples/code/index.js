import { default as player_css_src } from '$src/components/player/player-widget.svelte?raw';
import { format_code } from '$src/layout/helper';

export const player_css = format_code(player_css_src);
