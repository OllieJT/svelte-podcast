import content from '$src/content/docs.md?raw';
import { use_markdown } from '$src/markdown';

/** @type { import('./$types').PageServerLoad} */
export const load = async () => {
	const post = await use_markdown(content);
	return { html: post.value };
};
