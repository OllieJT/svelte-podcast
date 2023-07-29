/**
 * Returns a string timestamp in the format of "hh:mm:ss" from a given number of seconds.
 * @param seconds - The number of seconds to convert to a timestamp.
 * @param force_hours - Whether to always include hours in the timestamp, even if it's 0.
 * @returns A string timestamp in the format of "hh:mm:ss".
 */
export function seconds_to_timestamp(
	seconds: number,
	force_hours = false,
): string {
	const hours = Math.floor(seconds / 3600);
	const hours_remainder = seconds % 3600;

	const minutes = Math.floor(hours_remainder / 60);
	const minutes_remainder = hours_remainder % 60;

	const secs = Math.floor(minutes_remainder);

	const hours_str = force_hours || hours > 0 ? `${section(hours)}:` : '';
	const minutes_str = minutes ? `${section(minutes)}:` : '00:';
	const seconds_str = secs ? `${section(secs)}` : '00';

	return `${hours_str}${minutes_str}${seconds_str}`;
}

/**
 * Returns a string representation of a number with a leading 0 if it's less than 10.
 * @param num - The number to format.
 * @returns A string representation of the number with a leading 0 if it's less than 10.
 */
export function section(num: number): string {
	if (num < 10) return `0${num}`;
	return num.toString();
}
