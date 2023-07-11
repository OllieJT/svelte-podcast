// include this in your /src/app.d.ts file

declare module 'svelte-podcast' {
	interface EpisodeDetails {
		// define your own properties here
		title: string;
		artwork?: string;
	}
}

export {};
