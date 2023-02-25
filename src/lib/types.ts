export type AudioPlayerElement = HTMLAudioElement | undefined;

export type AudioMetadata = Partial<{
	title: string;
	artwork: string;
}>;

export interface AudioLoadData extends AudioMetadata {
	src: string;
}

export interface AudioLoadOptions {
	autoplay: boolean;
	start_at?: number;
}

export interface UserPreferences {
	playback_rate: number;
	volume: number;
}
