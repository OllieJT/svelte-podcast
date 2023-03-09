import { writable } from 'svelte/store';

type Topic = string;

const content = new Set<Topic>();

const ropic_registry = writable<Topic[]>([...content]);

function add(value: Topic) {
	ropic_registry.update((prev) => {
		const content = new Set<Topic>(prev.filter(Boolean));
		Boolean(value) && content.add(value);
		return [...content];
	});
}

function slugify(value: string) {
	// replace all apaces with dashes
	let slug = value
		.replace(/\s+/g, '-')
		.toLowerCase()
		.trim()
		.replace(/[^\x00-\x7F]/g, '-')
		.replace(/[^a-z0-9-]/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
		.replace(/--+/g, '-');

	return encodeURI(slug);
}

export const topics = {
	subscribe: ropic_registry.subscribe,
	add,
	slugify,
};
