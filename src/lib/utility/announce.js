import { DEV } from 'esm-env';

/**
 * Object containing logger functions.
 * @typedef {Object} Announce
 * @property {function} info - Log info like events and data.
 * @property {function} warn - Log warnings for developers.
 * @property {function} error - Log errors for critical failures.
 */

/**
 * Type of logger.
 * @typedef {('info' | 'error' | 'warn')} Logger
 */

/**
 * Object containing Logger functions.
 *
 * @type {Readonly<{[K in Logger]: Function}>}
 */
const use_logger = Object.freeze({
	info: console.info,
	error: console.error,
	warn: console.warn,
});

/**
 * Log function.
 * @param {Logger} type - Type of logger.
 * @param {...unknown} content - Content to log.
 */
function log(type, ...content) {
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

/**
 * Object containing logger functions.
 * @type {Announce}
 * @exports announce
 */
export const announce = {
	/**
	 * Log an info message.
	 * @param {...unknown} content - Content to log.
	 */
	info: (...content) => log('info', ...content),
	/**
	 * Log a warning message.
	 * @param {...unknown} content - Content to log.
	 */
	warn: (...content) => log('warn', ...content),
	/**
	 * Log an error message.
	 * @param {...unknown} content - Content to log.
	 */
	error: (...content) => log('error', ...content),
};
