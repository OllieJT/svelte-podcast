export const slugify = (/** @type {string} */ str) =>
	encodeURI(str.toLowerCase().trim().replaceAll(' ', '_'));

export const format_code = (/** @type {string} */ code) =>
	code.replaceAll('\t', '  ');
