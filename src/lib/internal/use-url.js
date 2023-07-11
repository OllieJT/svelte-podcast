/**
 * @typedef {Object} RelativeURL
 * @property {string} pathname - The pathname of the URL.
 * @property {string} search - The search string of the URL.
 * @property {string} hash - The hash string of the URL.
 * @property {URLSearchParams} searchParams - The search parameters of the URL.
 */

/**
 * Converts a string to a URL object. If the string is not a valid URL, it will be appended to the Svelte website URL.
 * @param {string} href - The string to convert to a URL object.
 * @returns {URL} A URL object.
 */
const string_to_url = (href) => {
	try {
		return new URL(href);
	} catch (e) {
		return new URL(href, 'https://svelte.dev');
	}
};

/**
 * Parses a URL string and returns an object containing its pathname, search, hash, and searchParams.
 * @param {string} href - The URL string to parse.
 * @returns {RelativeURL} An object containing the pathname, search, hash, and searchParams of the URL.
 */
export const use_url = (href) => {
	const { pathname, search, hash, searchParams } = string_to_url(href);

	return { pathname, search, hash, searchParams };
};
