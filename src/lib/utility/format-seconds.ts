/**
 * Returns a string timestamp in the format of "hh:mm:ss" from a given number of seconds.
 * @param seconds - The number of seconds to convert to a timestamp.
 * @param force_hours - Whether to always include hours in the timestamp, even if it's 0.
 * @param seperator - The seperator to use between the hours, minutes, and seconds.
 * @returns A string timestamp in the format of "hh:mm:ss".
 */
function seconds_to_timestamp(
	seconds: number,
	force_hours = false,
	seperator = ':',
): string {
	if (typeof seconds !== 'number') {
		return force_hours ? '00:00:00' : '00:00';
	}

	const hours = Math.floor(seconds / 3600);
	const hours_remainder = seconds % 3600;

	const minutes = Math.floor(hours_remainder / 60);
	const minutes_remainder = hours_remainder % 60;

	const secs = Math.floor(minutes_remainder);

	const show_hours = force_hours || hours > 0;

	const HH = hours.toString().padStart(2, '0');
	const MM = minutes.toString().padStart(2, '0');
	const SS = secs.toString().padStart(2, '0');

	const values = show_hours ? [HH, MM, SS] : [MM, SS];

	return values.join(seperator);
}

export const format_seconds = Object.freeze({
	to_timestamp: seconds_to_timestamp,
});
