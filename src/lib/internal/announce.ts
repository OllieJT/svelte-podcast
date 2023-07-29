import { DEV } from 'esm-env';

const use_logger = Object.freeze({
	info: console.info,
	error: console.error,
	warn: console.warn,
});

function log(type: 'info' | 'error' | 'warn', ...content: unknown[]) {
	const logger = use_logger[type];

	// If type is info and not in dev mode, return early
	if (type === 'info' && !DEV) return;

	// Log message
	logger(
		'%c🔊 svelte-podcast:',
		'color: #FF3E00; background-color: rgba(255, 62, 0, 0.15); padding: 4px 8px; border-radius:4px;',
		...content,
	);
}

export const announce = {
	/**
	 * Log an info message.
	 * @param {...unknown} content - Content to log.
	 */
	info: (...content: unknown[]) => log('info', ...content),
	/**
	 * Log a warning message.
	 * @param {...unknown} content - Content to log.
	 */
	warn: (...content: unknown[]) => log('warn', ...content),
	/**
	 * Log an error message.
	 * @param {...unknown} content - Content to log.
	 */
	error: (...content: unknown[]) => log('error', ...content),
} as const;
