// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// import type { ComponentType, SvelteComponentTyped } from 'svelte';

declare module '*.md' {
	export default ComponentType<SvelteComponentTyped>;
}
