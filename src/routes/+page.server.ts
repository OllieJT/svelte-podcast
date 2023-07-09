import content from '$content/docs.md?raw';
import type { PageServerLoad } from './$types';
import { use_markdown } from './use-markdown';

export const load = (async () => {
	const post = await use_markdown(content);
	return { html: post.value };
}) satisfies PageServerLoad;
