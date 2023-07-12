import { BROWSER } from 'esm-env';

export const slugify = (/** @type {string} */ str) =>
	encodeURI(str.toLowerCase().trim().replaceAll(' ', '_'));

export const format_code = (/** @type {string} */ code) =>
	code.replaceAll('\t', '  ');

export const on_this_page = () => {
	if (!BROWSER) return [];

	let anchorLinks = [];
	let aTags = document.getElementsByTagName('a');

	for (let i = 0; i < aTags.length; i++) {
		let href = aTags[i]?.getAttribute('href');
		if (href && href.startsWith('#')) {
			anchorLinks.push(href);
		}
	}

	return anchorLinks;
};
