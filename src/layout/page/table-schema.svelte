<script>
	import { Highlight } from 'svelte-highlight';
	import lang_ts from 'svelte-highlight/languages/typescript';

	/**
	 * Table Row
	 * @typedef {Object} Row
	 * @property {string} property - Property on the model
	 * @property {string} type - Value type
	 * @property {string} description - Description of the property
	 */

	/** @type {Row[]} */
	export let rows;
</script>

<div class="w-full overflow-x-auto">
	<table class="">
		<thead>
			<th class="w-max">Property</th>
			<th class="w-max">Type</th>
			<th>Description</th>
		</thead>
		<tbody>
			{#each rows as { property, type, description }}
				<tr>
					<!-- <td class="pr-4 font-mono">will_autoplay</td> -->
					<!-- <td class="pr-4 font-mono text-primary-600">boolean</td> -->
					<td class="not-prose">
						<Highlight code={property} language={lang_ts} />
					</td>
					<td class="not-prose">
						<Highlight code={type} language={lang_ts} />
					</td>
					<td> {description} </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
