import content from '$src/content/docs.md?raw';
import { use_markdown } from '$src/markdown';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const post = await use_markdown(content);
	return { html: post.value };
}) satisfies PageServerLoad;
