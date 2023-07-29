import { DEV } from 'esm-env';

const use_logger = Object.freeze({
	info: console.info,
	error: console.error,
	warn: console.warn,
});

const base_styles = `padding: 4px 8px; border-radius:4px;`;
const logger_styles = {
	error: `color: #FFFFFF; background-color: #FF0055; ${base_styles}`,
	warn: `color: #662200; background-color: #FFBB33; ${base_styles}`,
	info: `color: #80EAFF; background-color: #132686; ${base_styles}`,
} satisfies { [K in keyof typeof use_logger]: string };

function log(type: keyof typeof use_logger, ...content: unknown[]) {
	// If type is info and not in dev mode, return early
	if (type === 'info' && !DEV) return;

	const logger = use_logger[type];
	const styles = logger_styles[type];

	// Log message
	logger('%c🔊 svelte-podcast:', styles, ...content);
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
