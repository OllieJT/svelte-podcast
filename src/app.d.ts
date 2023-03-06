// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare module './lib/types' {
	interface EpisodeDetails {
		title: string;
		artwork: string;
	}
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
