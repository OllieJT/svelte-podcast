export interface EpisodeDetails {
	[key: string]: string | number | boolean;
}

export type EpisodeProgress = { current_time: number; timestamp: string; has_ended: boolean };

export type EpisodeAttributes = {
	will_autoplay: boolean;
	is_muted: boolean;
	duration: number;
	src: string;
	start_at: number;
	details: EpisodeDetails | null;
};

export type AudioLoadOptions = {
	autoplay: boolean;
	start_at?: number;
};

export interface UserPreferences {
	playback_rate: number;
	volume: number;
}
