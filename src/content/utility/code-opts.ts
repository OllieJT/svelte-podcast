import type { CodeBlockProps } from 'svhighlight/code/CodeBlock.svelte';

export const code_opts = {
	background: 'bg-mono-900',
	focusType: 'highlight',
	highlightColor: 'bg-mono-800',
	headerClasses: 'bg-mono-800',
} satisfies CodeBlockProps;
