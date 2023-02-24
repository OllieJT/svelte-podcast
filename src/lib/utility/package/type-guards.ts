export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean';
}

export function isNumber(value: any): value is number {
	return typeof value === 'number' && !isNaN(value);
}
