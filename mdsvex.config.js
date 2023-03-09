import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeClasses from 'rehype-add-classes';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import remarkToc from 'remark-toc';

// import rehypeToc from '@microflash/rehype-toc';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'inverted',
		quotes: true,
		ellipses: true,
	},

	remarkPlugins: [
		remarkGfm,
		remarkGithub,
		[remarkToc, { tight: true, ordered: true, maxDepth: 4 }],
	],
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: 'wrap' }],
		[rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
		[rehypePrismPlus, { showLineNumbers: true }],
		[
			rehypeClasses,
			{
				'#table-of-contents + ol': 'table-of-contents',
				'#table-of-contents + ul': 'table-of-contents',
			},
		],
	],
});

export default config;
