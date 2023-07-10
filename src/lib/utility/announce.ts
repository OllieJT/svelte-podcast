import { dev } from '$app/environment';

const use_logger = {
	info: console.info,
	error: console.error,
	warn: console.warn,
};

type Logger = keyof typeof use_logger;

/**
 * Log function.
 * @param type - Type of logger.
 * @param content - Content to log.
 */
function log(type: Logger, ...content: unknown[]) {
	const logger = use_logger[type];

	// If type is info and not in dev mode, return
	if (type === 'info' && !dev) return;

	// Log message
	logger(
		'%c🔊 svelte-podcast:',
		'color: #FF3E00; background-color: rgba(255, 62, 0, 0.15); padding: 4px 8px; border-radius:4px;',
		...content,
	);
}

/**
 * Object containing logger functions.
 */
export const announce = {
	/**
	 * Log info message.
	 * @param content - Content to log.
	 */
	info: (...content: unknown[]) => log('info', ...content),
	/**
	 * Log warning message.
	 * @param content - Content to log.
	 */
	warn: (...content: unknown[]) => log('warn', ...content),
	/**
	 * Log error message.
	 * @param content - Content to log.
	 */
	error: (...content: unknown[]) => log('error', ...content),
};
