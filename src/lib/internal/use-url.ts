/**
 * An object representing a relative URL.
 */
interface RelativeURL {
	pathname: string;
	search: string;
	hash: string;
	searchParams: URLSearchParams;
}

/**
 * Converts a string to a URL object. If the string is not a valid URL, it will be appended to the Svelte website URL.
 * @param href - The string to convert to a URL object.
 * @returns A URL object.
 */
function string_to_url(href: string): URL {
	try {
		return new URL(href);
	} catch (e) {
		return new URL(href, 'https://svelte.dev');
	}
}

/**
 * Parses a URL string and returns an object containing its pathname, search, hash, and searchParams.
 * @param href - The URL string to parse.
 * @returns An object containing the pathname, search, hash, and searchParams of the URL.
 */
export function use_url(href: string): RelativeURL {
	const { pathname, search, hash, searchParams } = string_to_url(href);

	return { pathname, search, hash, searchParams };
}
