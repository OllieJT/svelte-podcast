export type PlayerElement = HTMLAudioElement | undefined;

export type PlayerMetadata = {
	duration: number;
	muted: boolean;
	paused: boolean;
	playbackRate: number;
	loading: boolean;
};
