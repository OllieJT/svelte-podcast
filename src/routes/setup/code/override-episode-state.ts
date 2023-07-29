// include this in your /src/app.d.ts file

declare module 'svelte-podcast' {
	interface AudioMetadata {
		title: string;
		artwork: string | null;
	}
}

export {};
