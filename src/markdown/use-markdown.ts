import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
// import rehypeAddClasses from 'rehype-add-classes';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';
import { hljsDefineSvelte } from './hljs-svelte';

export async function use_markdown(markdown: string) {
	const pipeline = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkGithub, {
			repository: 'https://github.com/OllieJT/svelte-podcast.git',
		})
		.use(remarkToc, { tight: true, ordered: true, maxDepth: 4 })
		.use(remarkRehype)
		.use(rehypeStringify)
		.use(rehypeSanitize, {
			...defaultSchema,
			attributes: {
				...defaultSchema.attributes,

				pre: [
					...(defaultSchema.attributes?.pre || []),
					[
						'className',
						'language-html',
						'language-typescript',
						'language-javascript',
						'language-svelte',
						'language-sh',
					],
				],

				code: [
					...(defaultSchema.attributes?.code || []),
					[
						'className',
						'language-html',
						'language-typescript',
						'language-javascript',
						'language-svelte',
						'language-sh',
					],
				],

				span: [
					...(defaultSchema.attributes?.span || []),
					[
						'className',
						'token',
						'comment',
						'prolog',
						'cdata',
						'punctuation',
						'builtin',
						'constant',
						'boolean',
						'number',
						'important',
						'atrule',
						'property',
						'keyword',
						'doctype',
						'operator',
						'inserted',
						'tag',
						'class-name',
						'symbol',
						'attr-name',
						'function',
						'deleted',
						'selector',
						'attr-value',
						'regex',
						'char',
						'string',
						'entity',
						'url',
						'variable',
						'bold',
						'italic',
						'namespace',
					],
				],
			},
		})
		// .use(rehypeAddClasses, {})
		.use(rehypeHighlight, { languages: { svelte: hljsDefineSvelte } })
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypeExternalLinks, {
			target: '_blank',
			rel: ['nofollow', 'noopener', 'noreferrer'],
		});

	const output = await pipeline.process(markdown);

	return output;
}
