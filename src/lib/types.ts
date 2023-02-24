export type AudioPlayerElement = HTMLAudioElement | undefined;

export interface AudioMetadata {
	title: string;
	artwork: string;
}

export interface AudioLoadData extends AudioMetadata {
	src: string;
}

export interface AudioLoadOptions {
	autoplay: boolean;
	start_at?: number;
}

export interface EpisodeProgress {
	current_time: number;
}

export interface UserPreferences {
	playback_rate: number;
	volume: number;
}
