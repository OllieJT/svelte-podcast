// include this in your /src/app.d.ts file

declare module 'svelte-podcast' {
	interface AudioMetadata {
		id: number;
		title: string;
		href: string;
		author: string;
		artwork: string | null;
	}
}

export {};
