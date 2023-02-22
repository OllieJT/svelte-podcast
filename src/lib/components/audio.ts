export type PlayerElement = HTMLAudioElement | undefined;

export function usePlayer<K extends keyof HTMLAudioElement>(
	el: PlayerElement,
	key: K,
	value: HTMLAudioElement[K]
) {
	if (!el) return;
	el[key] = value;
}
