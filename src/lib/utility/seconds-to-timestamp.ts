function section(t: number) {
	if (t < 10) return `0${t}`;
	return t;
}

export function secondsToTimestamp(seconds: number, force_hours = false) {
	const hh = Math.floor(seconds / 3600);
	const hh_remainder = seconds % 3600;
	const mm = Math.floor(hh_remainder / 60);
	const mm_remainder = hh_remainder % 60;
	const ss = Math.floor(mm_remainder);

	const hrs = force_hours || hh > 0 ? `${section(hh)}:` : '';
	const mins = mm ? `${section(mm)}:` : '00:';
	const secs = ss ? `${section(ss)}` : '00';

	return `${hrs}${mins}${secs}`;
}
