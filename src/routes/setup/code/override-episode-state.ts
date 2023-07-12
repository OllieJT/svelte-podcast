// include this in your /src/app.d.ts file

declare module 'svelte-podcast' {
	interface EpisodeDetails {
		title: string;
		artwork: string;
		guest_name: string;
	}
}

export {};
