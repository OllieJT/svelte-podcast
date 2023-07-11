<script>
	import { Highlight } from 'svelte-highlight';
	import lang_ts from 'svelte-highlight/languages/typescript';

	/**
	 * Table Row
	 * @typedef {Object} Row
	 * @property {string} method - Method on the module
	 * @property {string} description - Description of the method
	 */

	/** @type {Row[]} */
	export let rows;
</script>

<div class="w-full overflow-x-auto">
	<table class="">
		<thead>
			<th class="w-1/2">Method</th>
			<th class="w-1/2">Description</th>
		</thead>
		<tbody>
			{#each rows as { method, description }}
				<tr>
					<td class="not-prose">
						<Highlight code={method} language={lang_ts} />
					</td>
					<td class=""> {description} </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
