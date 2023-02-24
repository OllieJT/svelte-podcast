export function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number' && !isNaN(value);
}
