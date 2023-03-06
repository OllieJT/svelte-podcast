import { dev } from '$app/environment';

const useLogger = {
	info: console.info,
	error: console.error,
	warn: console.warn,
};

type Logger = keyof typeof useLogger;

export function log(type: Logger, ...content: unknown[]) {
	const logger = useLogger[type];

	if (type === 'info' && !dev) return;

	logger(
		'%c🔊 svelte-podcast:',
		'color: #FF3E00; background-color: rgba(255, 62, 0, 0.15); padding: 4px 8px; border-radius:4px;',
		...content,
	);
}

export const info = (...content: unknown[]) => log('info', ...content);
export const warn = (...content: unknown[]) => log('warn', ...content);
export const error = (...content: unknown[]) => log('error', ...content);
