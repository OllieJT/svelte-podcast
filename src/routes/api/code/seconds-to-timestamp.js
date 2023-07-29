import { seconds_to_timestamp } from 'svelte-podcast/utility/format-seconds';

// Example
seconds_to_timestamp(5173); // 01:26:13

// force hours
seconds_to_timestamp(2700, true); // 00:45:00
seconds_to_timestamp(2700, false); // 45:00 (default)
