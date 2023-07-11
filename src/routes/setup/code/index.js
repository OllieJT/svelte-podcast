import { format_code } from '$src/layout/helper';
import { default as add_audio_loader_src } from './add-audio-loader.svelte?raw';
import { default as install_src } from './install.sh?raw';

export const add_audio_loader = format_code(add_audio_loader_src);
export const install = format_code(install_src);
