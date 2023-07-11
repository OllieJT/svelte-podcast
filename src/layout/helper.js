export const slugify = (/** @type {string} */ str) =>
	encodeURI(str.toLowerCase().trim().replaceAll(' ', '_'));
