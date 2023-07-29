import { format_seconds } from 'svelte-podcast/utility/format-seconds';

// Example
format_seconds.to_timestamp(5173); // '01:26:13';

// force hours to be displayed
format_seconds.to_timestamp(2700, true); // '00:45:00';

// only display hours if there are any
format_seconds.to_timestamp(2700, false); // '45:00';
