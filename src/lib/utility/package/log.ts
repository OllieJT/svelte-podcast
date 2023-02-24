import { dev } from '$app/environment';

const useLogger = {
	error: console.error,
	info: console.info,
	warn: console.warn,
};

export type Logger = keyof typeof useLogger;

export function log(type: Logger, ...content: unknown[]) {
	const logger = useLogger[type];

	if (type === 'info' && !dev) return;

	logger('🔊 svelte-podcast: ', ...content);
}

export const info = (...content: unknown[]) => log('info', ...content);
export const warn = (...content: unknown[]) => log('warn', ...content);
export const error = (...content: unknown[]) => log('error', ...content);
