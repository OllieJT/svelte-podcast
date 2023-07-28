<script>
	import { audio } from './actions';

	/** @type {number} */
	export let seconds;

	/** @type {'forward' | 'backward'}*/
	export let type;

	$: handle_skip = () => audio.skip(seconds, type);
</script>

<button
	{...$$restProps}
	on:click={handle_skip}
	type="button"
	aria-label="Skip {type} by {seconds} seconds"
>
	<slot />
</button>
