export const get_pathname_from_url = (src: string) => {
	if (src.startsWith('http')) return new URL(src).pathname;
	else return new URL(src, 'https://svelte.dev').pathname;
};
